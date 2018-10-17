var mongoose = require('mongoose');

var pokemonSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,
    types: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Type'
        }
    ]
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = mongoose.model('Pokemon', pokemonSchema);