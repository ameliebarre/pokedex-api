var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var User = require('../models/User');

/**
 * Register a new user
 *
 * @param req
 * @param res
 */
exports.register = function(req, res) {
    const user = new User(req.body);

    bcrypt.hash(req.body.password, 12, function(err, hash) {

        if (err) {
            throw new Error('Unable to hash the password');
        }

        user.password = hash;

        user.save().then(function(user, err) {
            if (err) {
                throw new Error('There was a problem registering the user.');
            }

            user.password = hashedPassword;
            res.status(200).send(user);

        }).catch(function(err) {
            res.status(500).send({ message: err.message });
        });
    });
};