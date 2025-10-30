var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller');

/* GET login page */
router.get('/signin', authController.showLogin);

/* GET register page */
router.get('/signup', authController.showRegister);

/* POST login form */
router.post('/login', authController.login);

/* POST register form */
router.post('/register', authController.register);


module.exports = router;