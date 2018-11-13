import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

export interface IUserModel {
    comparePassword(candidatePassword: string, hash: string, callback: Function): void,
    findByEmail(email: string, callback: Function): void
}

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

userSchema.static('comparePassword', (candidatePassword: string, hash: string, callback: Function) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            throw err;
        }
        callback(null, isMatch);
    });
});

userSchema.static('findByEmail', (email: string, callback: Function) => {
    User.findOne({email: email}, callback);
});

/*userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) {
                return reject(err);
            }

            return resolve(success);
        });
    });
};*/

export type UserModel = mongoose.Model<IUser> & IUserModel & IUser;

export const User: UserModel = <UserModel>mongoose.model<IUser>("User", userSchema);