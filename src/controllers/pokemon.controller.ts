import Pokemon from '../models/Pokemon';
import { Request, Response } from "express";

class PokemonController {

    /**
     * Find all Pokemons
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    public findAllPokemon = async(req, res, next) => {

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
    public findPokemonBySlug = async(req, res) => {
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
    public createPokemon = async(req: Request, res: Response) => {
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