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

// // Submit a new scam report
// const submitScamReport = async (req, res) => {
//     const { 
//         scammerName, 
//         scamType, 
//         description, 
//         scammerEmail, 
//         scammerAccountNumber,
//          reportedBy, 
//          status, 
//          evidence
//         } = req.body;

//     if (!scammerName || !scamType || !description || !scammerEmail || !scammerAccountNumber) {
//         return res.status(400).json({ message: 'All required fields must be provided' });
//     }

//     try {
//         const reportCount = await ScamReport.countDocuments();
//         const caseId = (reportCount + 1).toString().padStart(3, '0');
//         const newReport = new ScamReport({
//             scammerName,
//             scamType,
//             description,
//             scammerEmail,
//             scammerAccountNumber,
//             reportedBy,
//             status: status || 'pending', 
//             evidence, 
//             caseId,
//         });
//         await newReport.save();
//         res.status(201).json({ message: 'Scam report submitted successfully', report: newReport });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error submitting scam report' });
//     }
// };

const submitScamReport = async (req, res) => {
    const { 
        scammerName, 
        scamType, 
        description, 
        scammerEmail, 
        scammerAccountNumber,
        evidence,
        reportedBy, // Optional (must be valid ObjectId if provided)
    } = req.body;

    if (!scammerName || !scamType || !description || !scammerEmail || !scammerAccountNumber) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        // Generate a unique caseId (safer than countDocuments)
        const latestReport = await ScamReport.findOne().sort({ caseId: -1 }).limit(1);
        const lastCaseId = latestReport ? parseInt(latestReport.caseId) : 0;
        const caseId = (lastCaseId + 1).toString().padStart(3, '0');

        const newReport = new ScamReport({
            scammerName,
            scamType,
            description,
            scammerEmail,
            scammerAccountNumber,
            reportedBy, // Must be valid ObjectId (or null)
            evidence,   // Must be a String (URL)
            caseId,
            // status & dateReported are auto-set by default
        });

        await newReport.save();
        res.status(201).json({ message: 'Scam report submitted successfully', report: newReport });
    } catch (error) {
        console.error("Database save error:", error);
        res.status(500).json({ 
            message: 'Error submitting scam report',
            error: error.message 
        });
    }
};

// Update an existing scam report 
const updateScamReport = async (req, res) => {
    const { id } = req.params;
    const { scammerName, scamType, description, status, evidence } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid scam report ID' });
    }

    try {
        const report = await ScamReport.findById(id);

        if (!report) {
            return res.status(404).json({ message: 'Scam report not found' });
        }

        report.scammerName = scammerName || report.scammerName;
        report.scamType = scamType || report.scamType;
        report.description = description || report.description;
        report.status = status || report.status;
        report.evidence = evidence || report.evidence;

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

//deleteScamreport
const deleteScamReport = async (req, res) => {
    try {
      const report = await ScamReport.findOneAndDelete({ 
        caseId: req.params.id,
        reportedBy: req.user._id 
      });
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
      
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting report' });
    }
}

module.exports = {
    getAllScamReports,
    getScamReportById,
    submitScamReport,
    updateScamReport,
    getUserScamReports,
    deleteScamReport,
};
