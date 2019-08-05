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
    public async getAllConsoles(req: Request, res: Response)
    {
        try {
            const populateQuery = [
                { path:'games', select: { _id: 0, pokemons: 0 } },
            ];

            const consoles = await Console.find({}).populate(populateQuery);

            return res.status(200).json(consoles);

        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}

export default ConsoleController;
