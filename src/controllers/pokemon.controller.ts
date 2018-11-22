import { Pokemon as Pokemon } from "../models/Pokemon";

class PokemonController {

    /**
     * Find all Pokemons
     *
     * @param req
     * @param res
     *
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
        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Find a Pokemon by slug
     *
     * @param req
     * @param res
     *
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
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Create a Pokemon
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public createPokemon = async(req, res) => {
        try {
            const pokemon = new Pokemon(req.body);
            await pokemon.save();

            res.status(200).send(pokemon);
        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Update a Pokemon
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public updatePokemon = async(req, res) => {
        try {
            const pokemon = await Pokemon.findOneAndUpdate({ slug: req.params.slug }, req.body);

            if (!pokemon) {
                return res.status(404).json({ message: "Ce Pokemon n'existe pas. Erreur lors de la modification.", success: false });
            }

            await res.status(201).send(pokemon);

            res.status(200).send(pokemon);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Delete a Pokemon
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public deletePokemon = async(req, res) => {
        try {
            const pokemon = await Pokemon.findOneAndDelete({ slug: req.params.slug });

            if (!pokemon) {
                return res.status(404).json({ message: "Ce Pokemon n'existe pas. Erreur lors de la suppression." });
            }

            res.status(200).json({
                status: 'success',
                message: 'Le Pokemon a été été supprimé avec succès'
            });
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}

export default new PokemonController();