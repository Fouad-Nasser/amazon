const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, 'name required'],
      },
      email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
      },
      phone: String,
      image: String,
  
      password: {
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'Too short password'],
      },
      role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user',
      },
      wishlist: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
      ],
     
    },
    { timestamps: true }
  );


userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword
  next()
  
})

  

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;