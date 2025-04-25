const Testimonial = require('../models/Testimonial'); // Adjust the path as needed

// Create a new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;

    // Create a new testimonial
    const newTestimonial = new Testimonial({
      name,
      message,
    });

    // Save the new testimonial to the database
    await newTestimonial.save();

    return res.status(201).json({
      message: 'Testimonial created successfully',
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find(); // Fetch all testimonials

    return res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

// Get a single testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id); // Fetch a specific testimonial by ID

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    return res.status(200).json(testimonial);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
};

// Update a testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, message },
      { new: true } 
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    return res.status(200).json({
      message: 'Testimonial updated successfully',
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id); // Delete testimonial by ID

    if (!deletedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    return res.status(200).json({
      message: 'Testimonial deleted successfully',
      testimonial: deletedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
