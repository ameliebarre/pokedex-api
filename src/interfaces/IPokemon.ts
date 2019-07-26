import * as mongoose from 'mongoose';
import IType from "./IType";

export default interface IPokemon extends mongoose.Document {
    name: string,
    slug: string,
    national_number: string,
    johto_number: string,
    description: string,
    sex: Array<string>,
    height: string,
    weight: string,
    hp: number,
    attack: number,
    defense: number,
    sp_attack: number,
    sp_defense: number,
    speed: number,
    evolution: IPokemon,
    evolution_way: string,
    types: Array<IType>,
    weaknesses: Array<IType>
}
