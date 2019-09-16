import * as mongoose from 'mongoose';
import IPokemon from "../interfaces/IPokemon";
require('../models/Game');

const PokemonSchema = new mongoose.Schema({
    names: {
        french_name: {
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
    },
    slug: {
        type: String,
        required: true
    },
    pokedex: {
        national: String,
        kanto: String,
        johto_oac: String,
        johto_hgss: String,
        hoenn_rse: String,
        hoenn_rosa: String,
        sinnoh: String,
        unys_nb: String,
        unys_n2b2: String,
        kalos: String,
        alola_sl: String,
        alola_usul: String,
    },
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
    statistics: {
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
    },
    catch_rate: {
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
    capacities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Capacity' }],
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
    weaknesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
    next: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' },
    prev: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }
});

export default mongoose.model<IPokemon>('Pokemon', PokemonSchema);
