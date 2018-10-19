var router = require('express').Router();
var pokemons = require('../controllers/pokemon.controller');

// Get all Pokemons
router.get('/', pokemons.findAllPokemon);

// Get a Pokemon by its slug
router.get('/:slug', pokemons.findPokemonBySlug);

// Get a Pokemon by its slug
router.post('/', pokemons.createPokemon);


module.exports = router;