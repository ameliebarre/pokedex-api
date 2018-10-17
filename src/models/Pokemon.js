var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [{ type: Schema.Types.ObjectId, ref: 'Type' }]
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;