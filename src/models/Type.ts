import * as mongoose from 'mongoose';
import IType from "../interfaces/IType";

const TypeSchema = new mongoose.Schema({
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

TypeSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'types'
});

TypeSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'weaknesses'
});

export default mongoose.model<IType>("Type", TypeSchema);
