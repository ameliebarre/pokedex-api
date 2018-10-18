var router = require('express').Router();
var Pokemon = require('../models/Pokemon');

// Get all pokemons with their types
router.get('/', function(req, res) {
    var populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];
    var query = Pokemon.find({}).populate(populateQuery);

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

router.post('/', function(req, res) {
    var pokemon = new Pokemon(req.body);

    pokemon.save(function(err, pokemon) {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(pokemon);
    })
});

// Update a pokemon
router.put('/:slug', function(req, res) {
   var query = Pokemon.find({ slug: req.params.slug });
});

module.exports = router;