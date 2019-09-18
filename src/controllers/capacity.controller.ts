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

    /**
     * Get a Capacity by its slug
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<void>}
     */
    public async getOneCapacity(req: Request, res: Response) {
        try {

            const populateQuery = [
                { path: 'type' },
                { path: 'generation.games' }
            ];

            const capacity = await Capacity.findOne({ 'slug': req.params.slug }).populate(populateQuery);

            // If the Pokemon does not exists, send an error
            if (!capacity) {
                throw new Error('The capacity does not exist');
            }

            res.status(200).json(capacity);

        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }

    /**
     * Create a new capacity
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<void>}
     */
    public async createCapacity(req: Request, res: Response) {
        try {
            const capacity = new Capacity(req.body);
            capacity.save();

            res.status(201).send(capacity);
        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }

    /**
     * Update an existing capacity
     *
     * @param {e.Request} req
     * @param {e.Response} res
     *
     * @returns {Promise<Response>}
     */
    public async updateCapacity(req: Request, res: Response) {
        try {

            const updatedCapacity = await Capacity.findOneAndUpdate({ slug: req.body.slug }, req.body, (err, capacity) => {
                if (err) {
                    return res.status(404).json({ message: "Erreur lors de la modification.", success: false });
                }

                return capacity;
            });

            res.status(201).json(updatedCapacity);

        } catch(error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }

}

export default CapacityController;
