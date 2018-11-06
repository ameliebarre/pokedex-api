const dotenv = require("dotenv").config();
const express = require('express');
const auth = require('../controllers/auth-controller').default;
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");

export = () => {
  let app = express();

  app.all(process.env.API_BASE + "*", (req, res, next) => {
    if (req.path.includes(process.env.API_BASE + 'login')) {
        return next();
    }

    return auth.authenticate((err, user, info) => {
      if (err) {
          return next(err);
      }

      if (!user) {
          if (info.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Your token has expired. Please generate a new one' });
          } else {
              return res.status(401).json({ message: info.message });
          }
      }

      app.set('user', user);

      return next();

    })(req, res, next);

  });

    const routes = require("../routes")(app);

    return app;
};

/*
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
};*/
