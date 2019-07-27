import { Router } from "express";

import GameController from "../controllers/game.controller";

class GameRouter {

    router: Router;
    gameController: GameController;

    constructor() {
        this.router = Router();
        this.gameController = new GameController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.gameController.getAllGames);
    }
}

const gameRouter = new GameRouter();
gameRouter.routes();

export default gameRouter.router;