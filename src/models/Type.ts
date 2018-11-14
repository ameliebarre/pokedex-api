import * as mongoose from 'mongoose';
import { IType } from "../interfaces/IType";

const typeSchema = new mongoose.Schema({
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

typeSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});

typeSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'weaknesses'
});

export const Type = mongoose.model<IType>("Type", typeSchema);