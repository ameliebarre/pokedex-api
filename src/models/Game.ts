import * as mongoose from 'mongoose';
import IGame from "../interfaces/IGame";

export const GameSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    slug: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
});

GameSchema.virtual('games', {
    ref: 'Game',
    localField: '_id',
    foreignField: 'pokemons'
});

export default mongoose.model<IGame>('Game', GameSchema);
