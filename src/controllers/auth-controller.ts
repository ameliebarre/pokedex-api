import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { User } from "../models/User";

export class AuthController {

    public register = async(req: Request, res: Response) => {
        try {
            let name = req.body.name;
            let email = req.body.email;
            let password = req.body.password;

            const reg = /\S+@\S+\.\S+/;

            this.checkEmailFormat(reg, email);

            let user = await User.findOne({ email: email });

            if (!user) {
                const hashedPassword = bcrypt.hashSync(password, 12);

                const user = new User({
                    name : name,
                    email : email,
                    password : hashedPassword,
                    permissions: req.body.permissions
                });

                await user.save();

                res.status(200).json({
                    success: true,
                    message: 'User created successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'This email address has already been taken.'
                });
            }

        } catch (err) {
            res.status(401).json({ "message": err.message, "success": false });
        }
    };

    public login = async(req: Request, res: Response) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            const reg = /\S+@\S+\.\S+/;

            this.checkEmailFormat(reg, email);

            let user = await User.findOne({ email: email });

            if (!user) {
                res.status(500).json({
                    success: false,
                    message: "The user doesn\'t seem to exist"
                });
            }

            let userPassword = await bcrypt.compare(password, user.password);

            if (!userPassword) {
                res.status(400).json({
                    success: false,
                    message: 'Wrong credentials'
                });
            } else {
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                    expiresIn: 604800 // 1 week
                });

                res.status(200).json({
                    success: true,
                    token: token,
                });
            }

        } catch (err) {
            res.status(401).json({ "message": err.message, "success": false });
        }
    };

    private checkEmailFormat(reg, email) {
        if (!reg.test(email)) {
            throw new Error("Email is not valid");
        }
    }
}