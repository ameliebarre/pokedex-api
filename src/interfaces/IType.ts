import * as mongoose from 'mongoose';

export default interface IType extends mongoose.Document {
    name: string,
    slug: string,
    color: string
}
