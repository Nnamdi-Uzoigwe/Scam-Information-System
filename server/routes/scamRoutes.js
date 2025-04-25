const express = require('express');
const router = express.Router();
const scamReportController = require('../controllers/scamReportController'); 


router.get('/', scamReportController.getAllScamReports);
router.get('/:id', scamReportController.getScamReportById);
router.post('/', scamReportController.submitScamReport);
router.patch('/:id', scamReportController.updateScamReport);

module.exports = router;
