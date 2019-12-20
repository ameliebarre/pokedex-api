import { Router } from "express";
import PokemonController from '../controllers/pokemon.controller';

class PokemonRouter {

    router: Router;
    pokemonController: PokemonController;

    constructor() {
        this.router = Router();
        this.pokemonController = new PokemonController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.pokemonController.getAllPokemon);
        this.router.get('/:id', this.pokemonController.getPokemon);
        this.router.post('/', this.pokemonController.createPokemon);
        this.router.put('/:slug', this.pokemonController.updatePokemon);
        this.router.delete('/:slug', this.pokemonController.deletePokemon);
        this.router.post('/generations', this.pokemonController.filterByGeneration);
        this.router.post('/types', this.pokemonController.filterByTypes);
    }
}


const pokemonRouter = new PokemonRouter();
pokemonRouter.routes();

export default pokemonRouter.router;
