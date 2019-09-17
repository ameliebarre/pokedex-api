import { Request, Response } from "express";

import Capacity from "../models/Capacity";

class CapacityController {

    /**
     * Get all Pokemons
     *
     * @param {e.Request} req
     * @param {e.Response} res
     */
    public async getAllCapacities(req: Request, res: Response) {
        try {

            const populateQuery = [
                { path: 'type' },
                { path: 'generation.games' }
            ];

            const capacities = await Capacity.find({}).populate(populateQuery);

            res.status(200).json(capacities);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }

}

export default CapacityController;
