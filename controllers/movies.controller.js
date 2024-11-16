const Movie = require('../models/Movie.model');

module.exports.listMovies = (req, res, next) => {
  Movie.find()
    .then(movies => res.render('movies/list', { movies }))
    .catch(err => next(err));
};

module.exports.create = (req, res, next) => {
  res.render('movies/form');
};

module.exports.doCreate = (req, res, next) => {
  // the stars and showtimes are strings separated by commas, we need to split them into arrays
  // "Tom Cruise, Brad Pitt, Angelina Jolie" => ["Tom Cruise", "Brad Pitt", "Angelina Jolie"]
  // also remove any extra spaces from the strings
  req.body.stars = req.body.stars.split(',').map(star => star.trim());
  req.body.showtimes = req.body.showtimes.split(',').map(star => star.trim());

  if (req.body.image === '') {
    delete req.body.image;
  }

  Movie.create(req.body)
    .then((createdMovie) => {
      console.log(createdMovie);
      res.redirect(`/movies/${createdMovie._id}`); // "/movies/dhoiashdoaishdljasd"
    })
    .catch(err => next(err));
};

module.exports.detailMovie = (req, res, next) => {
  const { movieId } = req.params;
  
  Movie.findById(movieId)
    .populate('reviews')
    .then((movie) => {
      res.render('movies/detail', { movie });
    })
    .catch(err => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => next(err));
};

module.exports.edit = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      movie.stars = movie.stars.join(', ');
      movie.showtimes = movie.showtimes.join(', ');
      res.render('movies/form', { movie });
    })
    .catch(err => next(err));
};

module.exports.doEdit = (req, res, next) => {
  const { movieId } = req.params;

  if (req.body.image === '') {
    delete req.body.image;
  }

  Movie.findByIdAndUpdate(movieId, req.body, { new: true })
    .then((updatedMovie) => {
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch(err => next(err));
};
