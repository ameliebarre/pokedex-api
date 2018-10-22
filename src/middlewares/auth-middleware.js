var jwt = require('jsonwebtoken');
var config = require('../../config');
var User = require('../models/User');

module.exports = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.JWT_SECRET, function(err, decode) {
            if (err) {
                return res.status(401).json({ error: true, message: 'Unauthorized access' });
            }

            req.decoded = decode;
            next();
        })
    } else {
        return res.status(401).send({
            "error": true,
            "message": 'Unauthorized access'
        });
    }
};