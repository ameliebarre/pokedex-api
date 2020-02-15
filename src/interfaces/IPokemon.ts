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
    pokedex: Array<{
        name: string,
        key: string,
        number: string,
        version: {
            name: string,
            key: string,
        }
    }>,
    color: string;
    family: string;
    talents: Array<{
        name: string;
        description: string;
    }>;
    description: string;
    sex: Array<{
        label: string,
        key: string,
        percentage: number
    }>;
    generation: number;
    height: number;
    weight: number;
    egg_group: Array<string>;
    statistics: {
        hp: {
            name: string,
            value: number
        },
        attack: {
            name: string,
            value: number
        },
        defense: {
            name: string,
            value: number
        },
        sp_attack: {
            name: string,
            value: number
        },
        sp_defense: {
            name: string,
            value: number
        },
        speed: {
            name: string,
            value: number
        },
    };
    experience_points: number;
    catch_rate: number;
    evolutions: {
        parent: [{
            pokemon: IPokemon,
            evolution: string
        }],
        children: [{
            pokemon: IPokemon,
            evolution: string
        }],
        mega: [{
            pokemon: IPokemon,
            evolution: string
        }]
    };
    shapes: Array<{
        name: String;
        slug: String;
    }>,
    capacities: Array<{
        capacity: ICapacity,
        level: number,
        game: IGame
    }>;
    localisations: Array<{
        game: IGame,
        localisation: string,
        generation: Number
    }>;
    types: Array<IType>;
    weaknesses: Array<IType>;
    next: IPokemon;
    prev: IPokemon;
}
