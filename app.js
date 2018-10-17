var express = require('express');
var mongoose = require('mongoose');

var app = express();

// Connection to database
mongoose.connect('mongodb://localhost/pokedex');

// Import models
require('./src/models/Pokemon');
require('./src/models/Type');

// Default route
app.get('/', function(req, res) {
    console.log(req);
    res.send('Pokedex is working');
});

// Routes
app.use('/pokemons', require('./src/routes/pokemon'));
app.use('/types', require('./src/routes/type'));

console.log('App running on port 3000');
app.listen(3000);