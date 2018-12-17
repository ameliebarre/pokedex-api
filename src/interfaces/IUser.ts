import * as mongoose from 'mongoose';
import { IPokemon } from "./IPokemon";
import { ITrainer } from "./ITrainer";

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    isFirstTime: boolean,
    permissions: any[],
    pokemons: IPokemon,
    trainer: ITrainer
}