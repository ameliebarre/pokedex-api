import { Request, Response } from "express";

import Console from "../models/Console";

class ConsoleController {

    /**
     * Get all consoles
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<void>}
     */
    public getAllConsoles(req: Request, res: Response)
    {
        try {
            Console.find({}, (error, consoles) => {
                if (error) {
                    throw error;
                }

                return res.status(200).json(consoles);

            }).populate('games');

        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}

export default ConsoleController;
