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
    next(err);
  })
});


router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  knex('movies').where({'id':id}).del().return('*')
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    next(err);
  })
});

function validMovie(req, res, next) {
  let messages = [];
  let { title, director, poster_url } = req.body;
  let year = parseInt(req.body.year,10);
  if (req.body.year === '' || isNaN(parseInt(req.body.year,10)) || req.body.year.split('').length != 4) {
    messages.push('Year must be a 4-digit year (e.g. 1996).');
  }
  let rating = parseInt(req.body.rating,10);
  if (isNaN(rating) || rating < 1 || rating > 10) {
    messages.push('Rating must be a number between 1 and 10.');
  }
  if (title === '') {
    messages.push('Title is a required field.');
  }
  if (director === '') {
    messages.push('Director is a required field.');
  }

  req.movie = {title, director, year, rating, poster_url};
  req.messages = messages;
  next();
}

router.post('/', validMovie, function(req, res, next) {
  messages = req.messages || [];
  if (messages.length > 0) {
    req.flash('error',JSON.stringify(messages));
    res.redirect('/new');
  } else {
    let {title, director, year, rating, poster_url} = req.movie;
    knex('movies').insert({ 'title': title, 'director': director, 'year': year,'rating': rating, 'poster_url':poster_url }).return('*')
    .then((result) => {
      res.redirect(`/movies/:${result.id}`);
    })
    .catch((err) => {
      next(err);
    })
  }
});

module.exports = router;
