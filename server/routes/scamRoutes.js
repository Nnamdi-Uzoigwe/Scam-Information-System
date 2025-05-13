const express = require('express');
const router = express.Router();
const scamReportController = require('../controllers/scamReportController'); 
const authenticateUser = require('../middleware/authMiddleware');


router.get('/', scamReportController.getAllScamReports);
router.get('/my-reports', authenticateUser, scamReportController.getUserScamReports); 
router.get('/:id', scamReportController.getScamReportById);
router.post('/', authenticateUser, scamReportController.submitScamReport);
router.patch('/:id', scamReportController.updateScamReport);
router.delete('/:id', authenticateUser, scamReportController.deleteScamReport);

module.exports = router;
