import { Router } from "express";

import CapacityController from "../controllers/capacity.controller";

class CapacityRouter {

    router: Router;
    capacityController: CapacityController

    constructor() {
        this.router = Router();
        this.capacityController = new CapacityController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.capacityController.getAllCapacities);
    }

}

const capacityRouter = new CapacityRouter();
capacityRouter.routes();

export default capacityRouter.router;
