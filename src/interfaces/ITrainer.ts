import * as mongoose from "mongoose";

export default interface ITrainer extends mongoose.Document {
    name: string,
    slug: string,
}
