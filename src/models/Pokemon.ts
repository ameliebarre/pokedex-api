import * as mongoose from 'mongoose';
import IPokemon from "../interfaces/IPokemon";


const pokedexSchema = [
    {
        kanto: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        johto: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        hoenn: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        sinnoh: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        kalos: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        alola: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    },
    {
        unys: {
            versions: [
                {
                    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                    number: { type: String }
                }
            ]
        }
    }
];

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
    pokedex: pokedexSchema,
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
