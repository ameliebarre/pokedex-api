import { Document } from "mongoose";

export default interface IGame extends Document {
    name: string,
    slug: string,
    picture: string
}
