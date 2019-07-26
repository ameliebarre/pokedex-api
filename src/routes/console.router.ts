import { Router } from "express";

import ConsoleController from "../controllers/console.controller";

class ConsoleRouter {

    router: Router;
    consoleController: ConsoleController;

    constructor() {
        this.router = Router();
        this.consoleController = new ConsoleController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.consoleController.getAllConsoles);
    }
}


const consoleRouter = new ConsoleRouter();
consoleRouter.routes();

export default consoleRouter.router;
