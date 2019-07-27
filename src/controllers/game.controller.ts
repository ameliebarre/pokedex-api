import { Request, Response } from 'express';

import Game from "../models/Game";

class GameController
{

    public async getAllGames(req: Request, res: Response) {
       try {
            let games = await Game.find({});

           res.status(200).json(games);

        } catch(error) {
           res.status(500).send({ message: error.message, success: "false" });
       }
    }

}

export default GameController;