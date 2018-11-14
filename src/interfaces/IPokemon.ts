import * as mongoose from 'mongoose';
import { IType } from "./IType";

export interface IPokemon extends mongoose.Document {
    name: string,
    slug: string,
    national_number: string,
    johto_number: string,
    description: string,
    sex: [],
    height: string,
    weight: string,
    hp: number,
    attack: number,
    defense: number,
    sp_attack: number,
    sp_defense: number,
    speed: number,
    picture: string,
    evolution: IPokemon,
    evolution_way: string,
    types: IType,
    weaknesses: IType
}