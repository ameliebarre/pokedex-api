import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    comparePassword(candidatePassword: string): Promise<boolean>;
}