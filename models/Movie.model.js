const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  stars: {
    type: [String]
  },
  image: {
    type: String,
    default: 'https://critics.io/img/movies/poster-placeholder.png'
  },
  description: {
    type: String
  },
  showtimes: {
    type: [String]
  },
}, {
  virtuals: true,
});

movieSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'movie',
  justOne: false,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
