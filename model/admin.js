const mongoose = require('mongoose');



const adminSchema = mongoose.Schema({
    __id : mongoose.Schema.Types.ObjectId,
     fullname: {type : String, required: true, trim: true, minlength: 3, maxlength: 30, match: /[a-f]*/ },
     email :{ type : String,required: true, trim: true, unique: true, validate: /\S+@\S+\.\S+/ },
     mobilenumber:{type:String, required: true,  unique: true, minlength: 10, maxlength: 10, match: /[0-9]*/ },
     password:{type:String, required: true}
   
});

module.exports = mongoose.model('Admin', adminSchema);
