import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from "../interfaces/user";

const schema = new mongoose.Schema({
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

schema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'trainer'
});

schema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'pokemons'
});

schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) {
                return reject(err);
            }

            return resolve(success);
        });
    });
};

export const model = mongoose.model<IUser>("User", schema);