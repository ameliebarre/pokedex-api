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

    public updateProdile = async(req, res, next) => {
        try {
            User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
                if (err) {
                    return next(err);
                }

                res.send('User updated.');
            });
        } catch(error) {
            res.status(500).send({ message: error.error.message, success: false })
        }
    }

}