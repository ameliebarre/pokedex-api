import * as mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    name: String,
    firstname: String,
    birthDate: String,
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    sex: String,
    city: String,
    zipcode: String,
    country: String,
    phone: Number,
    password: {
        type: String,
        required: true
    },
    isFirstTime: {
      type: Boolean,
      default: true
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