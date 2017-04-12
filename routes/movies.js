const express = require('express');
const knex = require('../db/connection');

const router = express.Router();

router.get('/', (req, res, next) => {
  knex.select('id', 'title', 'director', 'year', 'rating').from('movies').orderBy('title', 'desc')
  .then((movies) => {
    res.render('movies', { movies });
  })
  .catch((err) => {
    next(err);
  });
});

function validMovie(req, res, next) {
  const messages = [];
  const { title, director, poster_url } = req.body;
  const year = parseInt(req.body.year, 10);
  if (req.body.year === '' || isNaN(parseInt(req.body.year, 10)) || req.body.year.split('').length !== 4) {
    messages.push('Year must be a 4-digit year (e.g. 1996).');
  }
  const rating = parseInt(req.body.rating, 10);
  if (isNaN(rating) || rating < 1 || rating > 10) {
    messages.push('Rating must be a number between 1 and 10.');
  }
  if (title === '') {
    messages.push('Title is a required field.');
  }
  if (director === '') {
    messages.push('Director is a required field.');
  }

  req.movie = { title, director, year, rating, poster_url };
  req.messages = messages;
  next();
}

function getSingleMovie(req, res, next) {
  const id = req.params.id;
  knex.select('id', 'title', 'director', 'year', 'rating', 'poster_url').from('movies').where({ id })
  .then((movies) => {
    const movie = movies[0];
    req.movie = movie;
  })
  .catch((err) => {
    next(err);
  });
  next();
}

router.get('/:id', getSingleMovie, (req, res) => {
  res.render('detail', { movie: req.movie });
});

router.get('/:id/edit', getSingleMovie, (req, res) => {
  res.render('edit', { movie: req.movie });
});

router.put('/:id', validMovie, (req, res, next) => {
  const id = req.params.id;
  const { title, director, year, rating, poster_url } = req.body;
  knex('movies').update({ title, director, year, rating, poster_url }).where({ id })
  .then(() => {
    res.redirect('/movies');
  })
  .catch((err) => {
    next(err);
  });
});


router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('movies').where({ id }).del().return('*')
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/', validMovie, (req, res, next) => {
  const messages = req.messages || [];
  if (messages.length > 0) {
    req.flash('error', JSON.stringify(messages));
    res.redirect('/new');
  } else {
    const { title, director, year, rating, poster_url } = req.movie;
    knex('movies').insert({ title, director, year, rating, poster_url }).return('*')
    .then((result) => {
      res.redirect(`/movies/:${result.id}`);
    })
    .catch((err) => {
      next(err);
    });
  }
});

module.exports = router;
