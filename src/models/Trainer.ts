import { Schema, model } from 'mongoose';

const trainerSchema = new Schema({
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

export default model('Trainer', trainerSchema);