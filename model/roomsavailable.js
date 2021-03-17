const mongoose = require('mongoose');


const roomsAvailableSchema = mongoose.Schema({
     __id: mongoose.Schema.Types.ObjectId,

     no_of_people_per_room: { type: Number, require: true },
     room_type: { type: String, require: true },
     price: { type: Number, require: true },
     rooms_available: { type: Number, require: true },
     roomSize: { type: Number, require: true }


});

module.exports = mongoose.model('RoomsAvailable', roomsAvailableSchema);