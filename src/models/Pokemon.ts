import { Schema, model } from 'mongoose';

import IPokemon from "../interfaces/IPokemon";

require('../models/Game');

const PokemonSchema = new Schema({
    names: {
        french: {
            type: String,
            required: true
        },
        english: {
            type: String,
            required: true
        },
        japanese: {
            type: String,
            required: true
        },
    },
    slug: {
        type: String,
        required: true
    },
    pokedex: [
        {
            name: String,
            key: String,
            number: String,
            version: {
                name: String,
                key: String,
            }
        }
    ],
    color: String,
    family: {
        type: String
    },
    talents: [
        {
            name: String,
            description: String
        }
    ],
    description: {
        type: String,
        required: true
    },
    sex: [
        {
            label: String,
            key: String,
            percentage: Number
        }
    ],
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
    egg_group: Array,
    statistics: {
        hp: {
            name: String,
            value: Number
        },
        attack: {
            name: String,
            value: Number
        },
        defense: {
            name: String,
            value: Number
        },
        sp_attack: {
            name: String,
            value: Number
        },
        sp_defense: {
            name: String,
            value: Number
        },
        speed: {
            name: String,
            value: Number
        },
    },
    experience_points: {
        type: Number,
        required: true
    },
    catch_rate: {
        type: Number,
        required: true
    },
    evolutions: {
        parent: {
            pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
            evolution: { type: String }
        },
        children: {
            pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
            evolution: { type: String }
        },
        mega: {
            pokemon: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
            evolution: { type: String }
        }
    },
    shapes: [
        {
            name: String,
            slug: String
        }
    ],
    localisations: [
        {
            game: { type: Schema.Types.ObjectId, ref: 'Game' },
            localisation: String,
            generation: Number
        }
    ],
    size: {
        type: String,
        required: true
    },
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
    weaknesses: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
    next: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
    prev: { type: Schema.Types.ObjectId, ref: 'Pokemon' }
});

export default model<IPokemon>('Pokemon', PokemonSchema);
