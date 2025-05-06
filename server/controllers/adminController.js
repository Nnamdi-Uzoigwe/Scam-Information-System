const Admin = require('../models/Admin');
const ScamReport = require('../models/ScamReport');
const Testimonial = require('../models/Testimonial');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//login admin
exports.loginAdmin = async (req, res) => {
  try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      console.log(admin)
      if (!admin) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }


      const token = jwt.sign(
          { 
              id: admin._id, 
              role: 'admin' 
          }, 
          process.env.JWT_SECRET, 
          { expiresIn: '7d' }
      );

      const adminData = admin.toObject();
      delete adminData.password;

      res.json({ 
          message: 'Admin login successful', 
          token,
          admin: adminData
      });
  } catch (err) {
      console.error('Admin login error:', err);
      res.status(500).json({ message: 'Server error' });
  }
};

// View all scam reports
exports.getAllScamReports = async (req, res) => {
  try {
    const reports = await ScamReport.find().populate('reportedBy', 'username email');
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
};

// Delete a scam report
exports.deleteScamReport = async (req, res) => {
  try {
    await ScamReport.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Scam report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting report', error: err.message });
  }
};

// view all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting testimonial', error: err.message });
  }
};
