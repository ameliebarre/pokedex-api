import { Schema, model } from 'mongoose';

import ICapacity from "../interfaces/ICapacity";

const CapacitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: String,
    description: {
        type: String,
        required: true
    },
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    generations: [
        {
            puissance: String,
            precision: String,
            pp: String,
            generation: Number
        }
    ],
    ct_cs: String
});

export default model<ICapacity>('Capacity', CapacitySchema);
