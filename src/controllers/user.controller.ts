import { Request, Response } from "express";
import { User } from "../models/User";
import * as mongoose from "mongoose";

export class UserController
{
    /**
     * Get a user profile
     *
     * @param {e.Request} req
     * @param {Response} res
     *
     * @returns {Promise<void>}
     */
    public getUserProfile = async(req: Request, res: Response) => {
        try {

            if (!req.params.id) {
                res.status(401).json({ message: "Unauthorized error : private profile" })
            }

            const user = await User.findById(req.params.id);

            res.status(200).json(user);

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
    public updateProfile = async(req: Request, res: Response) => {
        try {
            let id = mongoose.Types.ObjectId(req.params.id);

            const user = await User.findByIdAndUpdate(id, {$set: req.body});

            res.status(201).json(user);
        } catch(error) {
            res.status(500).send({ message: error, success: false })
        }
    };

}