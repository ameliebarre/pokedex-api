import * as mongoose from 'mongoose';
import { IPokemon } from "./IPokemon";
import { ITrainer } from "./ITrainer";

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    pokemons: IPokemon,
    trainer: ITrainer
}