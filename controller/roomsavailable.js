const mongoose = require("mongoose");
const hosteldetails = require("../model/hosteldetails");
const RoomsAvailable = require("../model/roomsavailable");

exports.roomsAvailable_post = (req, res, next) => {
  hosteldetails.findOne({ admin: req.adminId }, (err, result) => {
    if (err) throw err;
    if (!result.roomsAvailable) {
      const roomsAvailable = new RoomsAvailable({
        _id: new mongoose.Types.ObjectId(),
        rooms: {
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          peoplePerRoom: req.body.peoplePerRoom,
          roomType: req.body.roomType,
          price: req.body.price,
          roomsAvailable: req.body.roomsAvailable,
          roomSize: req.body.roomSize,
          washroomsPerRoom: req.body.washroomsPerRoom,
        },
      });
      roomsAvailable.save().then((rooms) => {
        hosteldetails.findOne({ admin: req.adminId }, (err, result) => {
          if (err) throw err;
          if (result) {
            result.roomsAvailable = roomsAvailable._id;
            res.status(201).json({ success: rooms });
          }
          return result.save();
        });
      });
    } else {
      hosteldetails.findOne({ admin: req.adminId }, (err, result) => {
        if (err) throw err;
        if (result) {
          RoomsAvailable.findOne(
            { _id: result.roomsAvailable },
            (err, respons) => {
              if (err) throw err;
              if (respons) {
                respons.rooms.push({
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.name,
                  peoplePerRoom: req.body.peoplePerRoom,
                  roomType: req.body.roomType,
                  price: req.body.price,
                  roomsAvailable: req.body.roomsAvailable,
                  roomSize: req.body.roomSize,
                  washroomsPerRoom: req.body.washroomsPerRoom,
                });
                respons.save().then((rooms) => {
                  return res.status(201).json({ success: rooms });
                });
              } else {
                return res.status(500).json({ error: "err" });
              }
            }
          );
        }
      });
    }
  });
};



exports.roomsAvailable_delete = (req, res, next) => {
  hosteldetails.findOne({ admin: req.adminId }, (err, details) => {
    if (err) throw err;
    if (details) {
      RoomsAvailable.findOneAndUpdate(
        { _id: details.roomsAvailable },
        { $pull: { rooms: { _id: req.params.roomId } } },
        { new: true },
        (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(201).json({ success: process.env.POST_DELETED });
          }
        }
      );
    }
  });
};



exports.roomsAvailable_put = (req, res, next) => {
  const id = req.params.roomId;
  hosteldetails.findOne({ admin: req.adminId }, (err, details) => {
    if (err) throw err;
    if (details) {
      RoomsAvailable.updateOne(
        {
          _id: details.roomsAvailable,
          "rooms._id": id,
        },
        {
          $set: {
            "rooms.$.name": req.body.name,
            "rooms.$.peoplePerRoom": req.body.peoplePerRoom,
            "rooms.$.roomType": req.body.roomType,
            "rooms.$.price": req.body.price,
            "rooms.$.roomsAvailable": req.body.roomsAvailable,
            "rooms.$.roomSize": req.body.roomSize,
            "rooms.$.washroomsPerRoom": req.body.washroomsPerRoom,
          },
        },
        { new: true },
        (err, result) => {
          if (result) {
            res.status(201).json({ result: process.env.POST_UPDATED });
          }
        }
      );
    }
  });
};
