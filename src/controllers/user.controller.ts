import { User } from "../models/User";

export class UserController {

    public getUserProfile = async(req, res) => {
        try {

            if (!req.params.id) {
                res.status(401).json({ message: "Unauthorized error : private profile" })
            }

            const user = await User.findById(req.params.id);

            res.status(200).json(user);

        } catch(error) {
            res.status(500).send({ message: error.message, success: false });
        }
    };

    public updateProfile = async(req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(201).json(user);
        } catch(error) {
            res.status(500).send({ message: error.error.message, success: false })
        }
    }

}