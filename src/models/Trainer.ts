import { Schema, model } from 'mongoose';
import { ITrainer } from "../interfaces/ITrainer";

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

export const Trainer = model<ITrainer>('Trainer', trainerSchema);