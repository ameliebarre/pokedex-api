import { Document } from "mongoose";
import IPokemon from "./IPokemon";

export default interface IGame extends Document {
    name: string,
    slug: string,
    released_date: Date,
    pokemons: Array<IPokemon>
}
