import { User } from "../models/User";
import * as mongoose from "mongoose";

export class UserController {

    public getUserProfile = async(req, res) => {
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

    public updateProfile = async(req, res, next) => {
        try {
            let id = mongoose.Types.ObjectId(req.params.id);

            const user = await User.findByIdAndUpdate(id, {$set: req.body});

            res.status(201).json(user);
        } catch(error) {
            res.status(500).send({ message: error, success: false })
        }
    }

    public updateTrainer = async(req, res, next) => {
        try {
            let id = mongoose.Types.ObjectId(req.params.id);
            let trainerId = mongoose.Types.ObjectId(req.body.trainer._id);

            // const user = await User.findByIdAndUpdate(id, {$set: req.body});
            const user = await User.findOneAndUpdate({ _id: id }, { $set: { 'trainer': trainerId } });

            res.status(201).json(user);
        } catch(error) {
            console.log(req.body);
            res.status(500).send({ message: error, success: false })
        }
    }

}