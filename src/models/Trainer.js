const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    age: {
        type: Number
    },
    picture: {
        type: String,
        required: true
    }
});

const Trainer = mongoose.model('Trainer', trainerSchema);
module.export = Trainer;