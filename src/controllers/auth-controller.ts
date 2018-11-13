import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { User } from "../models/User";

export class AuthController {

    public register = async(req: Request, res: Response) => {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);

        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            permissions: req.body.permissions
        });

        try {
            await user.save();
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    public login = async(req: Request, res: Response) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            const reg = /\S+@\S+\.\S+/;

            if (!reg.test(email)) {
                throw new Error("Email is not valid");
            }

            User.findByEmail(email, (err, user) => {
               if (user) {
                   User.comparePassword(password, user.password, (err, isMatch) => {
                      if (err) {
                        throw new Error("The password doesn't match");
                      }

                      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                          expiresIn: 604800 // 1 week
                      });

                       res.status(200).json({
                           success: true,
                           token: token
                       });
                   });
               }
            });

            /*const email = req.body.email;
            const password = req.body.password;

            let user = await User.findOne({ "email": email }).exec();

            if (user === null) {
                throw 'User not found';
            }

            if (email === user.email && user.comparePassword(password)) {
                const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).json({
                    success: true,
                    token: token
                });

            } else {
                throw new Error('Invalid credentials');
            }*/

        } catch (err) {
            res.status(401).json({ "message": err.message, "success": false });
        }
    }
}