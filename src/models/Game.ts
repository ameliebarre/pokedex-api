import { Schema, model } from 'mongoose';

import IGame from "../interfaces/IGame";

const GameSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    slug: {
        type: String,
        required: true
    },
    pokemons: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
});

export default model<IGame>('Game', GameSchema);
