var router = require('express').Router();
var pokemons = require('../controllers/pokemon.controller');

// Get all Pokemons
router.get('/', pokemons.findAllPokemon);

// Get a Pokemon by its slug
router.get('/:slug', pokemons.findPokemonBySlug);

// Get a Pokemon by its slug
router.post('/', pokemons.createPokemon);


/*
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
*/

module.exports = router;