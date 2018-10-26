const Pokemon = require('../models/Pokemon');

/**
 * Find all Pokemons
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
module.exports.findAllPokemon = async(req, res, next) => {

    const populateQuery = [
        { path:'types', select:'name color' },
        { path:'weaknesses', select:'name color' },
        { path:'evolution', select:'name picture number' }
    ];

    try {
        const pokemons = await Pokemon.find({}).populate(populateQuery);
        res.status(200).json(pokemons);
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
        const pokemon = await Pokemon.find({ slug: req.params.slug }).populate(populateQuery);

        if (pokemon.length === 0) {
            throw new Error('Pokemon does not exist');
        }

        res.status(200).json(pokemon);

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
        const pokemon = await pokemon.save();
        res.status(200).send(pokemon);
    } catch(err) {
        next(err);
    }
};