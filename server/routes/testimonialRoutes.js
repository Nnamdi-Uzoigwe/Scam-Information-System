const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/', authenticateUser, testimonialController.createTestimonial);
router.patch('/:id', authenticateUser, testimonialController.updateTestimonial);
router.delete('/:id', authenticateUser, testimonialController.deleteTestimonial);
router.get('/', testimonialController.getAllTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

module.exports = router;
