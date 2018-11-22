import { Request, Response } from "express";
import { User } from "../models/User";

export class UserController {

    public profileRead = async(req, res) => {
        try {

            if (!req.payload._id) {
                res.status(401).json({ message: "Unauthorized error : private profile" })
            }

            const user = await User.findById(req.payload._id);

            res.status(200).json(user);

        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }

}