const mongoose = require('mongoose');




const adminSchema = mongoose.Schema({
    __id : mongoose.Schema.Types.ObjectId,
     fullName: {type : String, required: true, trim: true, minlength: 3, maxlength: 30, match: /[a-f]*/ },
     email :{ type : String,required: true, trim: true, unique: true, validate: /\S+@\S+\.\S+/ },
     mobileNumber:{type:String, required: true,  unique: true, minlength: 10, maxlength: 10, match: /[0-9]*/ },
     password:{type:String, required: true,minlength:6},
     profilePic: { type: String },
     OTP:{type:String},
     otpExpire:Date,
     isVerified:{type:Boolean,default:false},
     myhostel :{
        type : mongoose.Schema.Types.ObjectId,
             ref :"Hosteldetails"},
});





module.exports = mongoose.model('Admin', adminSchema);
