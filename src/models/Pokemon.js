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
    number: {
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
    picture: {
        type: String,
        required: true
    },
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }]
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;