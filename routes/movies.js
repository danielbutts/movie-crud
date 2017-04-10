var express = require('express');
var router = express.Router();
const knex = require('../db/connection');

router.get('/', function(req, res, next) {
  knex.select('id','title','director','year','rating').from('movies').orderBy('title','desc')
  .then((movies) => {
    res.render('movies', {movies});
  })
  .catch((err) => {
    console.error(err);
  })
});

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

router.get('/:id/edit', function(req, res, next) {
  let id = req.params.id;
  knex.select('id','title','director','year','rating','poster_url').from('movies').where({'id':id})
  .then((movies) => {
    let movie = movies[0];
    res.render('edit', { movie });
  })
  .catch((err) => {
    console.error(err);
  })
});

router.put('/:id', function(req, res, next) {
  let id = req.params.id;
  let { title, director, year, rating, poster_url } = req.body;
  knex('movies').update({'title': title, 'director': director, 'year': year, 'rating': rating, 'poster_url': poster_url}).where({'id':id})
  .then((result) => {
    res.redirect('/movies');
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = router;
