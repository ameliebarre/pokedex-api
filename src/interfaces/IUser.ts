import * as mongoose from 'mongoose';
import IPokemon from "./IPokemon";
import ITrainer from "./ITrainer";

export default interface IUser extends mongoose.Document {
    name: string,
    firstname: string,
    birthDate: String,
    uid: number,
    email: string,
    sex: string,
    city: string,
    zipcode: string,
    country: string,
    phone: number,
    password: string,
    isFirstTime: boolean,
    permissions: any[],
    pokemons: IPokemon,
    trainer: ITrainer
}
