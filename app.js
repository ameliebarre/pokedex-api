const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./src/middlewares/auth-middleware');
const app = express();

// Connection to database
mongoose.connect('mongodb://localhost/pokedex', { useNewUrlParser: true });

// Import models
require('./src/models/Pokemon');
require('./src/models/Type');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type:'application/json'}));

app.all('/api/*', [bodyParser(), auth]);

// Default route
app.get('/', function(req, res) {
    console.log('Test', req.body);
    res.send('Pokedex is working');
});

// Routes
app.use('/api/pokemons', require('./src/routes/pokemon-router'));
app.use('/api/types', require('./src/routes/type-router'));
app.use('/auth', require('./src/routes/auth-router'));

console.log('App running on port 4500');
app.listen(4500);