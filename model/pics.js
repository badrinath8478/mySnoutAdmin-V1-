
const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    images: {
        data:Buffer,
        contentType : String
    }
    
    
    
});

module.exports = mongoose.model('Pics', imageSchema);