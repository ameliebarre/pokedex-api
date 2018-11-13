import * as mongoose from 'mongoose';

export interface IType extends mongoose.Document {
    name: string,
    slug,
    color: string
}