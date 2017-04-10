var express = require('express');
var router = express.Router();
const knex = require('../db/connection');


/* GET users listing. */
router.get('/', function(req, res, next) {
  knex.select('id','title','director','year','rating').from('movies')
  .then((movies) => {
    console.log(movies);
    res.render('movies', {movies});
  })
  .catch((err) => {
    console.error(err);
  })
});

module.exports = router;
