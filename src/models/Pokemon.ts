import * as mongoose from 'mongoose';
import IPokemon from "../interfaces/IPokemon";

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    national_number: {
        type: String,
        required: true
    },
    johto_number: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sex: {
        type: Array,
        required: true
    },
    generation: {
        type: Number,
        required: false
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    defense: {
        type: Number,
        required: true
    },
    sp_attack: {
        type: Number,
        required: true
    },
    sp_defense: {
        type: Number,
        required: true
    },
    speed: {
        type: Number,
        required: true
    },
    evolution: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
    evolution_way: {
        type: String,
        default: null
    },
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
    weaknesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }]
});

PokemonSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'evolution'
});

PokemonSchema.virtual('pokemonTypes', {
    ref: 'Type',
    localField: '_id',
    foreignField: 'type'
});

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);
