import * as mongoose from 'mongoose';
import { IUser } from "../interfaces/IUser";

const User = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    role: String,
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
}, {
    timestamps: false
});

export default mongoose.model<IUser & mongoose.Document>('User', User);
