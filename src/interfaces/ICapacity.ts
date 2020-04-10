import { Document } from 'mongoose';

import IType from "./IType";
import IGame from "./IGame";

export default interface ICapacity extends Document {
    name: string;
    slug: string;
    description: string;
    type: IType;
    generation: Array<{
        puissance: string,
        precision: string,
        pp: string,
        level: string,
        number: Number,
        games: Array<IGame>
    }>;
    ct_cs: string;
}
