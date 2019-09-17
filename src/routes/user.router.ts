import { Router } from "express";

import UserController from "../controllers/user.controller";

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
        this.router.put('/:id/reset-password', this.userController.resetPassword);
        this.router.delete('/:id', this.userController.deleteProfile);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;
