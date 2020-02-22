import { Router } from "express";
import AuthController from '../controllers/auth-controller';

class UserRouter {

    router: Router;
    authController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/signup', this.authController.signUp);
        this.router.post('/signin', this.authController.signIn);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;
