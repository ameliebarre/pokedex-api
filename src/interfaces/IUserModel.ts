import * as mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
    createPassword(candidatePassword: string, hash: string, callback: Function): void;
}