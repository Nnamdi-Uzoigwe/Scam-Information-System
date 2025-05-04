const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware'); 

router.post('/login', adminController.loginAdmin);

router.get('/scam-reports', adminMiddleware, adminController.getAllScamReports);
router.delete('/scam-reports/:id', adminMiddleware, adminController.deleteScamReport);
router.delete('/testimonials/:id', adminMiddleware, adminController.deleteTestimonial);

module.exports = router;
