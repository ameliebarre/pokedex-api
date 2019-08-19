import * as mongoose from 'mongoose';
import IPokemon from "../interfaces/IPokemon";
require('../models/Game');

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
    national: { type: String, required: true },
    kanto: { type: String, required: true },
    johto_oac: { type: String, required: true },
    johto_hgss: { type: String, required: true },
    hoenn_rse: { type: String, required: true },
    hoenn_rosa: { type: String, required: true },
    sinnoh: { type: String, required: true },
    unys_nb: { type: String, required: true },
    unys_n2b2: { type: String, required: true },
    kalos: { type: String, required: true },
    alola_sl: { type: String, required: true },
    alola_usul: { type: String, required: true },
    family: {
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
    evolutions: {
        parent: {
            pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
            evolution: { type: String }
        },
        children: {
            pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
            evolution: { type: String }
        },
    },
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
    weaknesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }]
});

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);
