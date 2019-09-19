import { Document } from 'mongoose';

import IType from "./IType";
import ICapacity from "./ICapacity";
import IGame from "./IGame";

export default interface IPokemon extends Document {
    names: {
        french: string,
        english: string,
        japanese: string,
    };
    slug: string,
    pokedex: {
        national: string,
        kanto: string,
        johto_oac: string,
        johto_hgss: string,
        hoenn_rse: string,
        hoenn_rosa: string,
        sinnoh: string,
        unys_nb: string,
        unys_n2b2: string,
        kalos: string,
        alola_sl: string,
        alola_usul: string,
    };
    family: string;
    talents: Array<string>;
    description: string;
    sex: Array<string>;
    generation: number;
    height: string;
    weight: string;
    statistics: {
        hp: number,
        attack: number,
        defense: number,
        sp_attack: number,
        sp_defense: number,
        speed: number,
    };
    catch_rate: number;
    evolutions: {
        parent: {
            pokemon: IPokemon,
            evolution: string
        },
        children: {
            pokemon: IPokemon,
            evolution: string
        }
    };
    capacities: Array<{
        capacity: ICapacity,
        level: number,
        game: IGame
    }>;
    types: Array<IType>;
    weaknesses: Array<IType>;
    next: IPokemon;
    prev: IPokemon;
}
