import { Pokemon as Pokemon } from "../models/Pokemon";
import {IPokemon} from "../interfaces/IPokemon";

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
    public createPokemon = async(req, res) => {
        try {
            const pokemon = new Pokemon(req.body);
            await pokemon.save();

            res.status(200).send(pokemon);
        } catch(error) {
            res.status(500).send({ message: error.message });
        }
    };

    /**
     * Update a Pokemon
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    public updatePokemon = async(req, res) => {
        try {
            const pokemon = await Pokemon.findOneAndUpdate({ slug: req.params.slug }, req.body);
            await res.send(pokemon);

            res.status(200).send(pokemon);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    /**
     * Delete a Pokemon
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    public deletePokemon = async(req, res) => {
        try {
            await Pokemon.findOneAndDelete({ slug: req.params.slug });
            await res.status(200).json({
                status: 'success',
                message: 'Le Pokemon a été été supprimé avec succès'
            })
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default new PokemonController();