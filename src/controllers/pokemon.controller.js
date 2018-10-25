const Pokemon = require('../models/Pokemon');

/**
 * Find all Pokemons
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.findAllPokemon = async(req, res, next) => {

    const populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];

    try {
        await Pokemon.find({}).populate(populateQuery).then(function(pokemons) {
            res.status(200).json(pokemons);
        })
    } catch(err) {
        next(err);
    }
};

/**
 * Find a Pokemon by slug
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.findPokemonBySlug = async(req, res, next) => {
    const populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];

    try {
        await Pokemon.find({ slug: req.params.slug }).populate(populateQuery).then(function(pokemon) {

            if (pokemon.length === 0) {
                throw new Error('Pokemon does not exist');
            }

            res.status(200).json(pokemon);

        })
    } catch(err) {
        next(err);
    }
};

/**
 * Create a Pokemon
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.createPokemon = async(req, res, next) => {
    const pokemon = new Pokemon(req.body);


    try {
        await pokemon.save().then(function(pokemon) {
            res.status(200).send(pokemon);
        });
    } catch(err) {
        next(err);
    }

};