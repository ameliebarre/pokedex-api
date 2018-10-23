var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
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
    trainer: [{ type: Schema.Types.ObjectId, ref: 'Type' }],
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

const User = mongoose.model('User', userSchema);
module.exports = User;