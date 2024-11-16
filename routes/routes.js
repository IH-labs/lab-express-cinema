const express = require('express');
const router = express.Router();
const {
  listMovies,
  detailMovie,
  deleteMovie,
  create,
  doCreate,
  edit,
  doEdit
} = require('../controllers/movies.controller');
const {
  doCreateReview
} = require('../controllers/reviews.controller');

// home
router.get('/', (req, res, next) => res.render('home'));

// movies
router.get('/movies', listMovies);
router.get('/movies/create', create);
router.post('/movies/create', doCreate);
router.get('/movies/:movieId', detailMovie);
router.post('/movies/:movieId/delete', deleteMovie);
router.get('/movies/:movieId/edit', edit);
router.post('/movies/:movieId/edit', doEdit);

// reviews
router.post('/reviews/:movieId/create', doCreateReview);

module.exports = router;
