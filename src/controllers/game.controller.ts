import { Request, Response } from 'express';

import Game from "../models/Game";

class GameController
{

    /**
     * Get the list of all Pokemons games
     *
     * @param {e.Request} req
     * @param {e.Response} res
     * @returns {Promise<void>}
     */
    public async getAllGames(req: Request, res: Response) {
       try {

           const populateQuery = [
               { path: 'pokemons' },
               { path:'pokemons', populate: { path: 'types', model: 'Type', select: { '_id': 0 } } },
               { path:'pokemons', populate: { path: 'weaknesses', model: 'Type', select: { '_id': 0 } } }
           ];

            let games = await Game.find({}).populate(populateQuery);

           res.status(200).json(games);

        } catch(error) {
           res.status(500).send({ message: error.message, success: "false" });
       }
    }

}

export default GameController;
