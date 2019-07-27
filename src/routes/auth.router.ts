import { Router } from "express";
import AuthController from '../controllers/auth.controller';

class UserRouter {

    router: Router;
    authController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', this.authController.register);
        this.router.post('/login', this.authController.login);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;
