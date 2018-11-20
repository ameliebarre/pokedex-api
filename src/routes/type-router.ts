import { Router } from "express";
import { TypeController } from "../controllers/type-controller";

class TypeRouter {

    router: Router;
    typeController: TypeController;

    constructor() {
        this.router = Router();
        this.typeController = new TypeController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.typeController.findAllTypes);
    }
}

const typeRouter = new TypeRouter();
typeRouter.routes();

export default typeRouter.router;