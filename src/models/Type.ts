import { Schema, model } from 'mongoose';

var typeSchema = new Schema({
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

export default model('Type', typeSchema);