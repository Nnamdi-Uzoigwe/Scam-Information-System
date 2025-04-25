const ScamReport = require('../models/ScamReport');
const mongoose = require('mongoose');

// Get all scam reports
const getAllScamReports = async (req, res) => {
    try {
        const reports = await ScamReport.find().populate('reportedBy', 'name email'); // Optional: Populate user details
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching scam reports' });
    }
};

// Get a single scam report by ID
const getScamReportById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid scam report ID' });
    }

    try {
        const report = await ScamReport.findById(id).populate('reportedBy', 'name email'); // Optional: Populate user details
        if (!report) {
            return res.status(404).json({ message: 'Scam report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching scam report' });
    }
};

// Submit a new scam report
const submitScamReport = async (req, res) => {
    const { scammerName, scamType, description, reportedBy, status, evidence } = req.body;

    // Validate that required fields are provided
    if (!scammerName || !scamType || !description) {
        return res.status(400).json({ message: 'All required fields must be provided' });
    }

    try {
        const newReport = new ScamReport({
            scammerName,
            scamType,
            description,
            reportedBy, // This can be a user ID from the logged-in user
            status: status || 'pending', // Default to 'pending'
            evidence, // This can be a URL of the image file
        });

        await newReport.save();
        res.status(201).json({ message: 'Scam report submitted successfully', report: newReport });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting scam report' });
    }
};

// Update an existing scam report (e.g., change status or add evidence)
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

        // Update fields as needed
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

module.exports = {
    getAllScamReports,
    getScamReportById,
    submitScamReport,
    updateScamReport,
};
