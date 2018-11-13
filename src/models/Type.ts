import * as mongoose from 'mongoose';
import { IType } from "../interfaces/type";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        default: 'red'
    }
});

schema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});

schema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'weaknesses'
});

export const model = mongoose.model<IType>("Type", schema);