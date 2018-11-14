import * as express from 'express';

import { Pokemon } from "../models/Pokemon";
import { Type } from '../models/Type';

class PokemonController {

    /**
     * Find all Pokemons
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    public findAllPokemon = async(req, res) => {

        try {
            const populateQuery = [
                { path:'evolution', select:'name picture number' },
                { path:'types', select:'name color' },
                { path:'weaknesses', select:'name color' }
            ];

            const pokemons = await Pokemon.find({}).populate(populateQuery);
            res.status(200).json(pokemons);
        } catch(err) {
            res.status(500).json({ "message": err.message, "success": false });
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
    findPokemonBySlug = async(req, res, next) => {
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

        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    };

    /**
     * Create a Pokemon
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    public createPokemon = async(req, res) => {
        const pokemon = new Pokemon(req.body);

        try {
            await pokemon.save();
            res.status(200).send(pokemon);
        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    };
}

export default new PokemonController();