import { Router } from "express";
import { TrainerController } from "../controllers/trainer.controller";

class TrainerRouter {
    router: Router;
    trainerController: TrainerController;

    constructor() {
        this.router = Router();
        this.trainerController = new TrainerController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.trainerController.findAllTrainers);
    }
}

const trainerRouter = new TrainerRouter();
trainerRouter.routes();

export default trainerRouter.router;