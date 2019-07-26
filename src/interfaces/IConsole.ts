import * as mongoose from 'mongoose';
import IGame from "./IGame";

export default interface IConsole extends mongoose.Document {
    name: string;
    slug: string;
    games: Array<IGame>;
}
