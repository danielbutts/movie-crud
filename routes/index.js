var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie Fun Times!' });
});

router.get('/new', function(req, res, next) {
  let flash = req.flash().error;
  let messages = [];
  if (flash !== undefined) {
    messages = JSON.parse(flash);
  }
  res.render('new', { title: 'Movie Fun Times!', messages : messages });
});

module.exports = router;
