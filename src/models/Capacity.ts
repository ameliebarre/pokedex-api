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
    type: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
    generation: [
        {
            puissance: Number,
            precision: Number,
            pp: Number,
            level: Number,
            number: Number,
            games: [{ type: Schema.Types.ObjectId, ref: 'Game' }]
        }
    ],
    ct_cs: String
});

export default model<ICapacity>('Capacity', CapacitySchema);
