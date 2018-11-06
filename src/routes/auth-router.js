const router = require('express').Router();
import userController from '../controllers/auth-controller';

class UserRouter {

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        router.post('/register', userController.register);
    }
}

export default new UserRouter();