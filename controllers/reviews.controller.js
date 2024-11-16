const Review = require('../models/Review.model');

module.exports.doCreateReview = (req, res, next) => {
  console.log('entro al doCreate');
  const { movieId } = req.params;
  req.body.movie = movieId;

  Review.create(req.body)
    .then(() => res.redirect(`/movies/${movieId}`))
    .catch(err => next(err));
};