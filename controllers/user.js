const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const factory = require('../utils/crudBuilder');



exports.getUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = factory.createOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);



exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

  exports.updateUserPassword = asyncHandler( async (req, res, next) => {
    let {password, newPassword} = req.body;
    const user = await User.findOne({ _id: req.user.id });

    if(user)
    {
      let valid = bcrypt.compareSync(password, user.password);

        if(valid){
          try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
            newPassword = hashedPassword;
            const user = await User.findByIdAndUpdate(
              req.user.id,
              {password:newPassword},
              {
                new: true,
              }
            );
    
            res.status(200).json({ data: user });
          } catch (error) {
            console.log(error);
            res.status(400).send("server error");
          }
            
        }
        else{
          res.status(400).json({ error: 'password not match' });
        }
    }
    else{
      res.status(400).json({ error: 'user not found' });
    }

  });

// 640f2bdd4f6e4a1982bed4f5
//  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDBmMmJkZDRmNmU0YTE5ODJiZWQ0ZjUiLCJ1c2VyUm9sZSI6InVzZXIiLCJpYXQiOjE2Nzg3MTY0MzgsImV4cCI6MTY3ODc1OTYzOH0.f0M1Iar-3h_VScWptF3CKlPoSw0Pq_52t39asfMvHNo 

exports.register = asyncHandler( async (req, res) => {
  let { name, email, password } = req.body
  const newUser = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({ data: newUser });
});


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


  exports.deactivateUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
  
    res.status(200).send('deactivate user Success');
  });