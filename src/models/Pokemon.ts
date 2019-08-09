import * as mongoose from 'mongoose';
import IPokemon from "../interfaces/IPokemon";

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    english_name: {
        type: String,
        required: true
    },
    japanese_name: {
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
    kanto_number: {
        type: String,
        required: true
    },
    johto_number: {
        type: String,
        required: true
    },
    hoenn_number: {
        type: String,
        required: true
    },
    sinnoh_number: {
        type: String,
        required: true
    },
    kalos_number: {
        type: String,
        required: true
    },
    alola_number: {
        type: String,
        required: true
    },
    unys_number: {
        type: String,
        required: true
    },
    pokemon_family: {
        type: String
    },
    talents: {
        type: Array,
        default: []
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
        type: Number,
        required: true
    },
    weight: {
        type: Number,
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
    parent: {
        pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
        evolution: { type: String }
    },
    children: {
        pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
        evolution: { type: String }
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
