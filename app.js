var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// Connection to database
mongoose.connect('mongodb://localhost/pokedex', { useNewUrlParser: true });

// Import models
require('./src/models/Pokemon');
require('./src/models/Type');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type:'application/json'}));

// Default route
app.get('/', function(req, res) {
    console.log('Test', req.body);
    res.send('Pokedex is working');
});

// Routes
app.use('/pokemons', require('./src/routes/pokemon-router'));
app.use('/types', require('./src/routes/type-router'));

console.log('App running on port 4500');
app.listen(4500);