var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/pokedex');

app.get('/', function(req, res) {
    console.log(req);
    res.send('Pokedex is working');
});

console.log('App running on port 3000');
app.listen(3000);