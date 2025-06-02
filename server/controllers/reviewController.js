const Review = require('../models/Review');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('ride_id from_user_id to_user_id');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('ride reviewer reviewee');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new review
const createReview = async (req, res) => {
  const review = new Review(req.body);
  try {
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
