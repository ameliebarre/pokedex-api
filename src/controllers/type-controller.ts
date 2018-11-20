import { Type } from "../models/Type";

export class TypeController {

    /**
     * Find all types
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public findAllTypes = async(req, res) => {
        try {
            const types = await Type.find({});
            res.status(200).send(types);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    }
}