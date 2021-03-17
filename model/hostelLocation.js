const mongoose = require('mongoose');
const geocoder = require('../geocoder');

const locationSchema = mongoose.Schema({
    __id: mongoose.Schema.Types.ObjectId,
    coordinates: { type: [Number], index: '2d sphere' }
});

// locationSchema.pre('save',async function(next){
//     const loc = await geocoder.geocode(this.hosteladress);
//     console.log(loc);
//     this.location = {
//         type : 'Point',
//         coordinates : [loc[0].latitude,loc[0].longitude],
//         formattedAddress :loc[0].formattedAddress,
//         country :loc[0].country,
//         state :loc[0].state,
//         city :loc[0].city,
//         street :loc[0].street,
//         zipcode :loc[0].zipcode
//     }
//     this.hosteladress= undefined;
//     next();
// });


module.exports = mongoose.model('Location', locationSchema);
