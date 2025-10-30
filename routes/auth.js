var express = require('express');
var router = express.Router();

/* GET signin page */
router.get('/signin', function(req, res, next) {
  res.render('auth/signin', { title: 'Sign In' });
});

/* GET signup page */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { title: 'Sign Up' });
});

module.exports = router;