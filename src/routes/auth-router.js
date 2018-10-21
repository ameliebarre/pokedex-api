var router = require('express').Router();
var user = require('../controllers/auth-controller');

// Create a user
router.post('/register', user.register);

// Login a user
router.post('/login', user.login);

module.exports = router;