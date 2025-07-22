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

// // Submit scam report
// const submitScamReport = async (req, res) => {
//   const {
//     scammerName,
//     telephoneNumbers,
//     emailAddress,
//     physicalAddress,
//     scamType,
//     scamLocation,
//     firstContact,
//     scamValue,
//     description,
//     scammerAccountNumber,
//     evidence,
//     scammerPhotos
//   } = req.body;

//   // Validate required fields
//   if (
//     !scammerName ||
//     !scamType ||
//     !description ||
//     !scamLocation ||
//     !firstContact ||
//     scamValue?.amount === undefined ||
//     scamValue?.amount === '' ||
//     isNaN(parseFloat(scamValue.amount)) ||
//     !scamValue?.currency
//   ) {
//     return res.status(400).json({ message: 'All required fields must be provided and valid' });
//   }

//   try {
//     // Fetch the most recent report with a valid numeric caseId
//     const latestReport = await ScamReport.findOne({ caseId: { $regex: /^\d+$/ } })
//       .sort({ caseId: -1 })
//       .limit(1);

//     let lastCaseId = 0;

//     if (latestReport && /^\d+$/.test(latestReport.caseId)) {
//       lastCaseId = parseInt(latestReport.caseId);
//     }

//     const caseId = (lastCaseId + 1).toString().padStart(3, '0');

//     // Create the new report
//     const newReport = new ScamReport({
//       caseId,
//       scammerName,
//       telephoneNumbers: telephoneNumbers || [],
//       emailAddress: emailAddress || '',
//       physicalAddress: physicalAddress || '',
//       scamType,
//       scamLocation,
//       firstContact,
//       scamValue: {
//         amount: parseFloat(scamValue.amount),
//         currency: scamValue.currency
//       },
//       description,
//       scammerAccountNumber: scammerAccountNumber || '',
//       evidence: evidence || [],
//       scammerPhotos: scammerPhotos || [],
//       reportedBy: req.user?.id || null,
//       status: 'pending'
//     });

//     await newReport.save();

//     return res.status(201).json({
//       message: 'Scam report submitted successfully',
//       report: newReport
//     });

//   } catch (error) {
//     console.error("Database save error:", error);
//     return res.status(500).json({
//       message: 'Error submitting scam report',
//       error: error.message
//     });
//   }
// };

const ScamReport = require("../models/ScamReport"); // Adjust the path as needed

const submitScamReport = async (req, res) => {
  const {
    scammerName,
    gender,
    telephoneNumbers,
    emailAddresses,
    physicalAddress,
    scamType,
    scamLocationType,
    scamLocation,
    firstContact,
    scamValue,
    description,
    scammerAccountNumber,
    evidence,
    scammerPhotos
  } = req.body;

  // Basic validation
  if (
    !scammerName?.firstName ||
    !scammerName?.surname ||
    !gender ||
    !scamType ||
    !scamLocationType ||
    !firstContact ||
    !description ||
    scamValue?.amount === undefined ||
    scamValue?.currency === undefined
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newReport = new ScamReport({
      scammerName: {
        firstName: scammerName.firstName,
        surname: scammerName.surname,
        otherNames: scammerName.otherNames || ''
      },
      gender,
      telephoneNumbers: telephoneNumbers || [],
      emailAddresses: emailAddresses || [],
      physicalAddress: {
        line1: physicalAddress?.line1 || '',
        line2: physicalAddress?.line2 || '',
        city: physicalAddress?.city || '',
        state: physicalAddress?.state || '',
        country: physicalAddress?.country || ''
      },
      scamType,
      scamLocationType,
      scamLocation: {
        physical: {
          address: scamLocation?.physical?.address || ''
        },
        website: {
          url: scamLocation?.website?.url || ''
        }
      },
      firstContact,
      description,
      scamValue: {
        amount: parseFloat(scamValue.amount),
        currency: scamValue.currency
      },
      scammerAccountNumber: scammerAccountNumber || '',
      evidence: evidence || [],
      scammerPhotos: scammerPhotos || [],
      reportedBy: req.user?.id || null,
      status: 'pending',
    });

    await newReport.save();

    return res.status(201).json({
      message: 'Scam report submitted successfully',
      report: newReport
    });

  } catch (error) {
    console.error("Error submitting scam report:", error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
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
