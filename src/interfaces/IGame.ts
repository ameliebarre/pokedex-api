import * as mongoose from "mongoose";

export default interface IGame extends mongoose.Document {
    name: string,
    slug: string,
    picture: string
}
