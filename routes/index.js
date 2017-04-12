const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Movie Fun Times!' });
});

router.get('/new', (req, res) => {
  const flash = req.flash().error;
  let messages = [];
  if (flash !== undefined) {
    messages = JSON.parse(flash);
  }
  res.render('new', { title: 'Movie Fun Times!', messages });
});

module.exports = router;
