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
        this.router.get('/profile', this.userController.profileRead);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;