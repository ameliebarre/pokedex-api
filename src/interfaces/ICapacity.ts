import { Document } from 'mongoose';

import IType from "./IType";

export default interface ICapacity extends Document {
    name: string;
    type: IType;
    ct_cs: string;
}
