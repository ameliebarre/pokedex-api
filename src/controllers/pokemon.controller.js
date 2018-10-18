const Pokemon = require('../models/Pokemon');

exports.findAllPokemon = function(req, res) {
    var populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];

    Pokemon.find({}).populate(populateQuery).then(function(pokemons) {
        res.status(200).json(pokemons);
    }).catch(function(err) {
        res.status(500).send({ message: err.message });
    });
};

exports.findPokemonBySlug = function(req, res) {
    var populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];

    Pokemon.find({ slug: req.params.slug }).populate(populateQuery).then(function(pokemon) {

        if (pokemon.length === 0) {
            throw new Error('Pokemon does not exist');
        }

        res.status(200).json(pokemon);

    }).catch(function(err) {
        res.status(500).send({ message: err.message });
    });
};

exports.createPokemon = function(req, res) {
    const pokemon = new Pokemon(req.body);

    pokemon.save().then(function(pokemon) {
        res.status(200).send(pokemon);
    }).catch(function(err) {
        res.status(500).send({ message: err.message });
    });
};