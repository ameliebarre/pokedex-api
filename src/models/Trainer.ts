import { Schema, model } from 'mongoose';

export const trainerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type:String,
        required: true
    }
});

export default model('Trainer', trainerSchema);