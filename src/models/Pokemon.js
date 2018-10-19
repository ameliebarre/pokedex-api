var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var pokemonSchema = new mongoose.Schema({
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
    picture: {
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

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;