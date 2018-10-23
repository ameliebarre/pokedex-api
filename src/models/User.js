const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

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
    trainer: [{ type: Schema.Types.ObjectId, ref: 'Trainer' }],
    pokemons: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
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

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;