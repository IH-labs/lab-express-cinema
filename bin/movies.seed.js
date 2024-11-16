const mongoose = require("mongoose");
const movies = require("./movies.json");
require('../config/db.config');
const Movie = require('../models/Movie.model');

mongoose.connection.once('open', () => {
  Movie.collection.drop()
    .then(() => {
      return Movie.create(movies);
    })
    .then((moviesCreated) => {
      console.log(moviesCreated.length + " movies created");
      mongoose.connection.close();
      process.exit(0);
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
});