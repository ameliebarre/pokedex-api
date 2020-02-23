import { Request, Response, NextFunction } from "express";
import { Container } from 'typedi';
import AuthService from './../services/auth.service';
import { IUserInputDTO } from './../interfaces/IUser';
import { EmailTakenError } from "./../errors/HttpError";

class AuthController {

    /**
     * Signup service
     * @param req
     * @param res 
     * @param next 
     */
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const authServiceInstance = Container.get(AuthService);
            const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO, res);
            return res.status(201).json({ user, token });
        } catch (error) {
            if (error instanceof EmailTakenError) {
                res.status(error.status).json({ "message": error.message, "success": false });
            } else {
                throw error;
            }
        }
    };

    /**
     * Signin service
     * @param req
     * @param res 
     * @param next 
     */
    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const authServiceInstance = Container.get(AuthService);
            const { email, password } = req.body;
            const { user, token } = await authServiceInstance.SignIn(email, password);
            return res.status(200).json({ user, token });
        } catch (e) {
            res.status(401).json({ "message": e.message, "success": false });
            return next(e);
        }
    }
}

export default AuthController;
