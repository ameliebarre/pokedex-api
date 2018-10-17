var router = require('express').Router();
var  Pokemon = require('../models/Pokemon');

// Get all pokemons with their types
router.get('/', function(req, res) {
    var query = Pokemon.find({}).populate('types');
    query.exec(function(err, pokemons) {
        res.status(200).json(pokemons);
    });
});

// Get a pokemon with its types
router.get('/:slug', function(req, res) {
   var query = Pokemon.find({ slug: req.params.slug }).populate('types');
    query.exec(function(err, pokemon) {
        if (err || pokemon.length === 0) {
            res.status(500).send({ message: 'Error while recovering Pokemon' });
        } else {
            res.status(200).json(pokemon);
        }
    });
});

module.exports = router;