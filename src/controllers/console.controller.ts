import { Request, Response } from "express";

import Console from "../models/Console";
import Game from "../models/Game";

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

    /**
     * Create a new console
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<void>}
     */
    public async postConsole(req: Request, res: Response) {
        try {

            let console = new Console(req.body);

            // Check if each game exists
            req.body.games.forEach(async(game) => {
               const isExists = await Game.findById(game._id);
               if (!isExists) {
                   return res.status(500).send({
                       message: 'GAME_DOES_NOT_EXIST'
                   });
               }
            });

            await console.save();

            res.status(200).json(console);

        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}

export default ConsoleController;
