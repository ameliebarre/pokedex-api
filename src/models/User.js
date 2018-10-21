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
    created_at: {
      type: Date,
      default: Date.now
    }
});

userSchema.methods.comparePassword = function(password) {
   return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;