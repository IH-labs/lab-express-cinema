const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;