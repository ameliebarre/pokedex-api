import * as mongoose from 'mongoose';
import IUser from "../interfaces/IUser";

const catchedSchema = new mongoose.Schema(
    {
        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        },
        catched: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Pokemon',
            }
        ]
    }
);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    name: String,
    uid: Number,
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
    games: [catchedSchema],
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IUser>('User', UserSchema);
