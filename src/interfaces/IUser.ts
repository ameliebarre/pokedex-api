import * as mongoose from 'mongoose';
import IPokemon from "./IPokemon";

export default interface IUser extends mongoose.Document {
    name: string;
    firstname: string;
    username: string;
    birthDate: string;
    uid: number;
    email: string;
    sex: string;
    city: string;
    zipcode: string;
    country: string;
    phone: number;
    password: string;
    isFirstTime: boolean;
    permissions: Array<any>;
    pokemons: IPokemon;
}
