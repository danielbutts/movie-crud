var express = require('express');
var router = express.Router();
const knex = require('../db/connection');


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.select('id','title','director','year','rating').from('movies')
  .then((movies) => {
    res.render('movies', {movies});
  })
  .catch((err) => {
    console.error(err);
  })
});

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  knex.select('id','title','director','year','rating','poster_url').from('movies').where({'id':id})
  .then((movies) => {
    let movie = movies[0];
    if (movie.poster_url === null) {
      movie.poster_url = "../images/blank_poster.jpg";
    }
    res.render('detail', { movie });
  })
  .catch((err) => {
    console.error(err);
  })
});
module.exports = router;
