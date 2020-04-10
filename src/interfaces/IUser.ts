import IPokemon from "./IPokemon";
import ITrainer from "./ITrainer";

export interface IUser {
    _id: string;
    username: string
    name: string,
    firstname: string,
    birthDate: String,
    email: string,
    sex: string,
    city: string,
    zipcode: string,
    country: string,
    password: string,
    role: string,
    pokemons: IPokemon,
}

export interface IUserInputDTO {
    email: string;
    password: string;
}
