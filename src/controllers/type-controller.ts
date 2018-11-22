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
    };

    /**
     * Find a type by its slug
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public findTypeBySlug = async(req, res) => {
        try {
            const type = await Type.find({ slug: req.params.slug });

            if (type.length === 0) {
                res.status(404).json({message: 'Type does not exist', success: false});
            }

            res.status(200).send(type);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Create a type
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public createType = async(req, res) => {
        try {
            const type = new Type(req.body);
            await type.save();

            res.status(200).send(type);
        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

    /**
     * Update a type
     *
     * @param req
     * @param res
     *
     * @returns {Promise<void>}
     */
    public updateType = async(req, res) => {
        try {
            const type = await Type.findOneAndUpdate({ slug: req.params.slug }, req.body);

            if (!type) {
                return res.status(404).json({ message: "Ce type n'existe pas. Erreur lors de la modification.", success: false });
            }

            await res.status(201).send(req.body);

        } catch (error) {
            res.status(500).send({ message: error.message, success: "false" });
        }
    };

}