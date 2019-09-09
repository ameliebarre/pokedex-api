import * as mongoose from 'mongoose';
import IType from "./IType";

export default interface IPokemon extends mongoose.Document {
    name: string,
    slug: string,
    english_name: string,
    japanese_name: string,
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
    family: string,
    talents: Array<string>,
    description: string,
    sex: Array<string>,
    generation: number,
    height: string,
    weight: string,
    hp: number,
    attack: number,
    defense: number,
    sp_attack: number,
    sp_defense: number,
    speed: number,
    evolutions: {
        parent: {
            pokemon: IPokemon,
            evolution: string
        },
        children: {
            pokemon: IPokemon,
            evolution: string
        }
    },
    types: Array<IType>,
    weaknesses: Array<IType>,
    next: IPokemon,
    prev: IPokemon
}
