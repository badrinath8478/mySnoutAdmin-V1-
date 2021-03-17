const mongoose = require("mongoose");
const Admin = require("../model/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const { validationResult } = require('express-validator/check');


exports.auth_post = (req, res, next) => {
  Admin.findOne({email:req.body.email}).exec().then(admin=>{
    if(admin){
      return res.status(500).json({message:"mail already exist"}) 
    }else{bcrypt.hash(req.body.password,10,(err,hash)=>{
      if(err){
        console.log(err);
        res.status(500).json({ error: err })
      }else{
        const admin = new Admin ({
          _id: new mongoose.Types.ObjectId(),
          fullname : req.body.fullname,
          email : req.body.email,
          mobilenumber : req.body.mobilenumber,
          password : hash
        });
        return admin.save().then(result => {
          console.log(result);
          res.status(201).json({ message :"sucess" });
        }).catch(err => {
          console.log(err);
          res.status(500).json({ error: err })
        });
      }
    });
  }
})
};


exports.login=(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  let users;
  Admin.findOne({email : email}).exec().then(admin=>{
    if(!admin){
      return res.status(201).json({ message: "MOBILE NUMBER NOT REGISTERED" });
    };
    admin = admin;
    return bcrypt.compare(password, admin.password)}).then(doMatch =>{
      if(doMatch){
        const token = jwt.sign({
          id: admin._id.toString(),
          mobilenumber :admin.mobilenumber
        },"secretkey");
        return res.status(201).json({ success: "SUCCESS", token: token });
      }else{
        return res.status(201).json({  message: "INCORRECT PASSWORD" });
      };
    }).catch(err =>{
    console.log(err);
  });
};


//pagination
// exports.wifi_get_all = async( req , res , next )=> {
//   try{
//     const {page = 1,limit = 10}= req.query;
//     const wifi = await Wifi.find().limit(limit*1).skip((page-1)*limit);
//     res.status(200).json({total:wifi.length,wifi});
//   } catch(error){
//     console.log(err);
//     res.status(500).json({
//       error:err
//     });
//   }
// };