const ScamReport = require('../models/ScamReport');
const mongoose = require('mongoose');

// Get all scam reports
const getAllScamReports = async (req, res) => {
    try {
        const reports = await ScamReport.find().populate('reportedBy', 'name email');
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching scam reports' });
    }
};

// Get a single scam report by case ID
const getScamReportById = async (req, res) => {
    const { id } = req.params;

    try {
        const report = await ScamReport.findOne({ caseId: id });
        if (!report) {
            return res.status(404).json({ message: 'Scam report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error('Error in getAllScamReports:', error.message);
        res.status(500).json({ message: 'Error fetching scam report' });
    }
};


// Update an existing scam report 
const updateScamReport = async (req, res) => {
    const { id } = req.params;
     const { 
        scammerName,
        telephoneNumbers,
        emailAddress,
        physicalAddress,
        scamType,
        scamLocation,
        firstContact,
        scamValue,
        description,
        scammerAccountNumber,
        evidence,
        scammerPhotos,
        status
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid scam report ID' });
    }

    try {
        const report = await ScamReport.findById(id);

        if (!report) {
            return res.status(404).json({ message: 'Scam report not found' });
        }

        report.scammerName = scammerName || report.scammerName;
        report.telephoneNumbers = telephoneNumbers || report.telephoneNumbers;
        report.emailAddress = emailAddress || report.emailAddress;
        report.physicalAddress = physicalAddress || report.physicalAddress;
        report.scamType = scamType || report.scamType;
        report.scamLocation = scamLocation || report.scamLocation;
        report.firstContact = firstContact || report.firstContact;
        if (scamValue) {
            report.scamValue = {
                amount: scamValue.amount ? parseFloat(scamValue.amount) : report.scamValue.amount,
                currency: scamValue.currency || report.scamValue.currency
            };
        }
        
        report.description = description || report.description;
        report.scammerAccountNumber = scammerAccountNumber || report.scammerAccountNumber;
        report.evidence = evidence || report.evidence;
        report.scammerPhotos = scammerPhotos || report.scammerPhotos;
        report.status = status || report.status;
        report.lastUpdated = new Date();

        await report.save();
        res.status(200).json({ message: 'Scam report updated successfully', report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating scam report' });
    }
};


const generateCaseId = async () => {
  try {
    const lastReport = await ScamReport.findOne().sort('-caseId');
    if (!lastReport) return '001'; // Starting point
    
    const lastId = parseInt(lastReport.caseId, 10);
    return (lastId + 1).toString().padStart(3, '0'); // Returns "033" etc.
  } catch (error) {
    console.error('CaseId generation failed:', error);
    return Date.now().toString().slice(-6); // Fallback
  }
};

const submitScamReport = async (req, res) => {
  try {
     const caseId = await generateCaseId();

    const { 
      scammerNames = [], 
      gender, 
      scamType, 
      description, 
      firstContact, 
      scamLocationType,
      telephoneNumbers = [],
      emailAddresses = [],
      physicalAddress = {},
      scamLocation = {},
      wasThroughAd = '',
      adUrl = '',
      scamValue = null,
      scammerBankName = '',
      scammerAccountNumber = '',
      evidence = [],
      scammerPhotos = [],
      reportedBy = 'Anonymous'
    } = req.body;

    // Validate required fields
    const requiredFields = {
      scammerNames: scammerNames?.length > 0 ? scammerNames[0].trim() : null,
      gender,
      scamType,
      description,
      firstContact,
      scamLocationType
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: 'Missing required fields',
        missingFields,
        success: false
      });
    }

    // Validate scamLocation based on scamLocationType
    if (scamLocationType === 'physical' && !scamLocation.physical?.address) {
      return res.status(400).json({
        message: 'Physical address is required for physical scam location',
        success: false
      });
    }

    if (scamLocationType === 'website' && !scamLocation.website?.url) {
      return res.status(400).json({
        message: 'Website URL is required for website scam location',
        success: false
      });
    }

    // Validate scamValue if provided
    if (scamValue) {
      if (!scamValue.amount || isNaN(Number(scamValue.amount))) {
        return res.status(400).json({
          message: 'Valid scam amount is required',
          success: false
        });
      }
      if (!scamValue.currency) {
        return res.status(400).json({
          message: 'Currency is required when providing scam value',
          success: false
        });
      }
    }

    // Clean and prepare data
    const reportData = {
      caseId,
       scammerName: {
        names: scammerNames
          .map(name => name.trim())
          .filter(name => name !== "")
      },
      gender,
      telephoneNumbers: telephoneNumbers.filter(num => num.trim()).map(num => num.trim()),
      emailAddresses: emailAddresses.filter(email => email.trim()).map(email => email.trim()),
      scamType,
      description: description.trim(),
      firstContact: firstContact.trim(),
      scamLocationType,
      scamLocation,
      reportedBy: reportedBy.trim(),
      status: 'pending' // Default status
    };

    // Add optional fields only if they exist
    if (physicalAddress && Object.values(physicalAddress).some(val => val)) {
      reportData.physicalAddress = {
        line1: physicalAddress.line1?.trim() || '',
        line2: physicalAddress.line2?.trim() || '',
        city: physicalAddress.city?.trim() || '',
        state: physicalAddress.state?.trim() || '',
        country: physicalAddress.country?.trim() || ''
      };
    }

    if (scamValue) {
      reportData.scamValue = {
        amount: Number(scamValue.amount),
        currency: scamValue.currency.trim()
      };
    }

    if (wasThroughAd) reportData.wasThroughAd = wasThroughAd;
    if (adUrl) reportData.adUrl = adUrl.trim();
    if (scammerBankName) reportData.scammerBankName = scammerBankName.trim();
    if (scammerAccountNumber) reportData.scammerAccountNumber = scammerAccountNumber.trim();
    if (evidence.length > 0) reportData.evidence = evidence;
    if (scammerPhotos.length > 0) reportData.scammerPhotos = scammerPhotos;

    // Create and save the report
    const newReport = new ScamReport(reportData);
    await newReport.save();

    res.status(201).json({
      message: 'Scam report submitted successfully',
      success: true,
      caseId: newReport.caseId
    });

  } catch (error) {
    console.error('Error submitting scam report:', error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate entry detected',
        success: false,
        field: Object.keys(error.keyPattern)[0]
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        errors
      });
    }

    // Generic error handler
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
};

// Find user specific scam report
const getUserScamReports = async (req, res) => {
    try {
        const reports = await ScamReport.find({ 
            reportedBy: req.user.id 
        }).sort({ dateReported: -1 });
        
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error in getUserScamReports:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch your reports',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

//delete scam report
const deleteScamReport = async (req, res) => {
    try {
        const report = await ScamReport.findOneAndDelete({ 
            caseId: req.params.id,
            reportedBy: req.user._id
        });

        if (!report) {
            return res.status(404).json({ error: 'Report not found or unauthorized' });
        }

        const deletedCaseId = parseInt(req.params.id);
        const reportsToUpdate = await ScamReport.find({
            caseId: { $gt: req.params.id }
        }).sort({ caseId: 1 }); 

        for (const report of reportsToUpdate) {
            const newCaseId = (parseInt(report.caseId) - 1).toString().padStart(3, '0');
            report.caseId = newCaseId;
            await report.save();
        }
        const highestReport = await ScamReport.findOne().sort({ caseId: -1 }).limit(1);
        if (!highestReport || parseInt(highestReport.caseId) < deletedCaseId) {
            await Counter.findOneAndUpdate(
                { name: "caseId" },
                { $inc: { value: -1 } }
            );
        }

        res.status(200).json({ message: 'Report deleted and case IDs reordered' });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: 'Error deleting report', details: error.message });
    }
};

module.exports = {
    getAllScamReports,
    getScamReportById,
    submitScamReport,
    updateScamReport,
    getUserScamReports,
    deleteScamReport,
};
