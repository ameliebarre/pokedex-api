import { Router } from "express";
import userController from '../controllers/auth-controller';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/register', userController.register);
        this.router.post('/login', userController.login);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;