'use strict';

import { Schema, model } from 'mongoose';
import { IPokemon } from "../interfaces/IPokemon";

const pokemonSchema = new Schema({
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
        required: true
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
    thumb: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    evolution: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
    evolution_way: {
        type: String,
        default: null
    },
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
    weaknesses: [{ type: Schema.Types.ObjectId, ref: 'Type' }]
});

pokemonSchema.virtual('pokemons', {
    ref: 'Pokemon',
    localField: '_id',
    foreignField: 'evolution'
});

pokemonSchema.virtual('pokemonTypes', {
    ref: 'Type',
    localField: '_id',
    foreignField: 'type'
});

export const Pokemon = model<IPokemon>('Pokemon', pokemonSchema);