var router = require('express').Router();
var user = require('../controllers/auth-controller');

// Create a user
router.post('/register', user.register);

module.exports = router;