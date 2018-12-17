import * as mongoose from 'mongoose';

export interface IType extends mongoose.Document {
    name: string,
    slug: string,
    color: string
}