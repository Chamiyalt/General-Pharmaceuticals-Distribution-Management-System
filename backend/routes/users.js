const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');


router.post("/signup",(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user = new User({
      email:req.body.email,
      password: hash,
      role: req.body.role
    });
    user.save().then(result=>{
      res.status(201).json({
        message:'user added',
        result: result
      });
    }).catch(err=>{
      res.status(200).json({
        message: "User name already exist"
      });
    });
  });
});



router.post("/signin",(req,res,next)=>{
  User.findOne({email:req.body.email}).then(user=>{
    console.log('done');
    if(!user){
      return res.status(401).json({
        message:'login faild'
      });
    }
    fetchUser = user;
    return bcrypt.compare(req.body.password,user.password)
  }).then(result=>{
    if(!result){
      return res.status(401).json({
        message:'login faild'
      });
    }
    console.log(fetchUser.role)
    const token = jwt.sign({email: fetchUser.email,userId: fetchUser._id},"secret_this_should_be_longer",{expiresIn:"1h"})
    res.status(201).json({
      token:token,
      iam:fetchUser.role
    });
  }).catch(err=>{
    return res.status(401).json({
      message:'login faild'
    });
  });
});

module.exports = router;
