import { Router } from "express";

import pokemonController from '../controllers/pokemon.controller';

class PokemonRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', pokemonController.findAllPokemon);
        this.router.get('/:slug', pokemonController.findPokemonBySlug);
        this.router.post('/', pokemonController.createPokemon);
        this.router.put('/:slug', pokemonController.updatePokemon);
        this.router.delete('/:slug', pokemonController.deletePokemon);
    }
}


const pokemonRouter = new PokemonRouter();
pokemonRouter.routes();

export default pokemonRouter.router;