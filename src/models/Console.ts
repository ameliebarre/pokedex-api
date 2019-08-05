import { Schema, model } from 'mongoose';

import IConsole from "../interfaces/IConsole";

export const ConsoleSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    slug: {
        type: String,
        required: true
    },
    releasedDate: {
        type: String,
        required: true
    },
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
});

export default model<IConsole>('Console', ConsoleSchema);
