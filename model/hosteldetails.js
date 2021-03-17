const mongoose = require('mongoose');


const hostelSchema = mongoose.Schema({
    __id: mongoose.Schema.Types.ObjectId,
    hostelname: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    hostelmail: { type: String, required: true, trim: true,  validate: /\S+@\S+\.\S+/ },
    hostelmobilenumber: { type: String, required: true, trim: true, unique: true, minlength: 10, maxlength: 10, match: /[0-9]*/ },
    wardenname: { type: String, required: true, trim: true, minlength: 3, maxlength: 30 },
    doornumber: { type: String, required: true },
    hosteladress: { type: String, required: true },
    estbyear:{type:Number,required:true},
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Hosteldetails', hostelSchema);


