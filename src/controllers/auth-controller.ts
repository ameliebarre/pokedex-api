import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');

import { model as User } from "../models/User";

class UserController {

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
            const email = req.body.email;
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
            }

        } catch (err) {
            res.status(401).json({ "message": err.message, "errors": err });
        }
    }
}

export default new UserController();

/*exports.register = function(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        permissions: req.body.permissions
    });

    user.save().then(function(user) {
        res.status(200).send(user);
    }).catch(function(err) {
        res.status(500).send({ message: err.message });
    });
};*/

/*
exports.login = function(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: req.body.email }).then(function(user) {

        if (!user) {
            throw new Error('User doesn\'t exist');
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
            throw new Error('Bad credentials');
        }
    }).catch(function(err) {
        res.status(500).send({ status: 'error', message: err.message });
    });
};*/
