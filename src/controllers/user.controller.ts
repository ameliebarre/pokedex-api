import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";

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
                throw {
                    message: 'USER_NOT_FOUND',
                    status: res.status
                };
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
            res.status(500).send({ message: error, success: false })
        }
    };

    /**
     * Reset a user password
     *
     * @param {e.Request} req
     * @param {e.Response} res
     * @returns {Promise<void>}
     */
    public async resetPassword(req: Request, res: Response) {
        try {
            const verifyPassword = req.body.verifyPassword;
            const newPassword = req.body.newPassword;
            const userId = req.params.id;

            if (!newPassword || newPassword === null) {
                return res.status(500).send({
                    message: 'You must fill in your current password'
                });
            }

            await User.findById(userId, (err, user) => {
                let userPassword = bcrypt.compare(verifyPassword, user.password);

                if (userPassword) {
                    // The user gave his current password, he can reset it by a new one
                    user.password = bcrypt.hashSync(newPassword, 12);
                    user.save((err) => {
                        if (err) {
                            return res.status(422).send({
                                message: 'CANT_UPDATE_PASSWORD'
                            });
                        } else {
                            res.status(200).json(user);
                        }
                    });
                } else {
                    // The user didn't give the right current password, he can't change his new password
                    return res.status(422).send({
                        message: 'PASSWORD_DOES_NOT_MATCH',
                        success: false
                    });
                }
            });

        } catch(error) {
            console.log(error);
            res.status(500).send({ message: error, success: false })
        }
    }

    /**
     * Delete a user
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<void>}
     */
    public async deleteProfile(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({ message: error, success: false })
        }
    }
}

export default UserController;
