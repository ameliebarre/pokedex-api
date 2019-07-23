import { Request, Response } from "express";
import * as mongoose from "mongoose";
import * as _ from 'lodash';

import User from "../models/User";

class UserController
{

    public async getAllUsers(req: Request, res: Response) {
        try {
            const users = await User.find({});

            res.status(200).json(users);
        } catch(error) {
            res.status(500).send({ message: error, success: false });
        }
    };

    /**
     * Get a user profile
     *
     * @param {e.Request} req
     * @param {Response} res
     *
     * @returns {Promise<void>}
     */
    public async getUserProfile(req: Request, res: Response) {
        try {

            let id = req.params.id;

            let user = await User.findById(id);

            if (user === null) {
                res.status(404)
                    .send({
                        message: 'No user found with the given id.',
                        status: res.status
                    });
            }

            return res.status(200).json(user);

        } catch(error) {
            res.status(500).send({ message: error, success: false });
        }
    };

    /**
     * Update informations profile
     *
     * @param {e.Request} req
     * @param {Response} res
     *
     * @returns {Promise<void>}
     */
    public async updateProfile(req: Request, res: Response) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                (err, updatedUser) => {
                    if (err) {
                        res.status(500).send(err);
                    }

                    return updatedUser;
                });

            res.status(200).json(user);

        } catch(error) {
            console.log(error);
            res.status(500).send({ message: error, success: false })
        }
    };
}

export default UserController;
