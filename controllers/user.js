const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const factory = require('../utils/crudBuilder');



exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.deleteUser = factory.deleteOne(User);


exports.updateUser = asyncHandler( async (req, res, next) => {
    const userData = req.body;
  
    const user = await User.findByIdAndUpdate(
      req.params.id,
      userData,
      {
        new: true,
      }
    );
  
    if (!user) {
        res.status(400).json({ error: 'user not found' });
    }
    else{
        res.status(200).json({ data: user });
    }
  });


  exports.updateUserPassword = asyncHandler( async (req, res, next) => {
    const userData = req.body;
    const user = await User.findOne({ _id: req.params.id });

    if(user)
    {
      let valid = bcrypt.compareSync(userData.password, user.password);

        if(valid){
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(userData.newPassword, salt);
            userData.newPassword = hashedPassword;
            const user = await User.findByIdAndUpdate(
              req.params.id,
              {password:userData.newPassword},
              {
                new: true,
              }
            );
    
            res.status(200).json({ data: user });
        }
        else{
          res.status(400).json({ error: 'password not match' });
        }
    }
    else{
      res.status(400).json({ error: 'user not found' });
    }

  });

// 640cf1098a7d420a836ddfc7
//   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBjZWVkY2YxOGMxMDJkYTdlZjRiNjUiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2Nzg1NjkxOTUsImV4cCI6MTY3ODYxMjM5NX0.3vKyRCDFDpQN1L-nY4z0eKHSE2jnLb5URUjkaI7rXfs

exports.login = asyncHandler( async (req, res) => {

    let { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      let valid = bcrypt.compareSync(password, user.password);
      if (valid) {
  
        const token = jwt.sign({
          userId: user._id,
          userRole: user.role
        }, process.env.SECRET, { expiresIn: '12h' });
  
        res.status(200).json({token})
      } else {
        res.status(401).json({ message: "invalid password" });
      }
    } else {
      res.status(401).json({ message: "user not found" })
    }
  
  });