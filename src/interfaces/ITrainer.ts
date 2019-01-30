import * as mongoose from "mongoose";

export interface ITrainer extends mongoose.Document {
    name: string,
    slug: string,
}