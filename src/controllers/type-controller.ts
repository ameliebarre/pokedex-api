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

    public findTypeBySlug = async(req, res) => {
      try {
          const type = await Type.find({ slug: req.params.slug });

          if (type.length === 0) {
              throw new Error('Type does not exist');
          }

          res.status(200).send(type);
      } catch (error) {
          res.status(500).send({ message: error.message, success: "false" });
      }
    }
}