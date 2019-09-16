import { Document } from 'mongoose';

import IType from "./IType";
import IGame from "./IGame";

export default interface ICapacity extends Document {
    name: string;
    slug: string;
    description: string;
    type: IType;
    puissance: number;
    precision: number;
    pp: number;
    generation: Array<{
        puissance: number,
        precision: number,
        pp: number,
        level: number,
        number: Number,
        games: Array<IGame>
    }>;
    ct_cs: string;
}
