import * as mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: Array,
        required: true,
        default: ['USER']
    },
    trainer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }],
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'trainer'
});

userSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'pokemons'
});

export const User = mongoose.model<IUser>("User", userSchema);