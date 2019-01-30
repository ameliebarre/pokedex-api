import { Trainer as Trainer } from "../models/Trainer";

export class TrainerController {

    /**
     * Find all trainers
     */
    public findAllTrainers = async(req, res) => {
        try {
            const trainers = await Trainer.find({});
            res.status(200).json(trainers);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}