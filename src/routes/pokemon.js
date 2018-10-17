var router = require('express').Router();
var  Pokemon = require('../models/Pokemon');

router.get('/', function(req, res) {
    var query = Pokemon.find({}).populate('types');
    query.exec(function(err, pokemons) {
        if(err) {
            res.send(err);
        }

        res.status(200).json(pokemons);
    });
});

module.exports = router;