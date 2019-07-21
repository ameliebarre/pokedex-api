import { Router } from "express";
import { UserController } from "../controllers/user.controller";

class UserRouter {
    router: Router;
    userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.routes();
    }

    routes() {
        this.router.get('/', this.userController.getAllUsers);
        this.router.get('/:id', this.userController.getUserProfile);
        this.router.put('/:id', this.userController.updateProfile);
        this.router.put('/:id/trainer', this.userController.updateProfile);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;