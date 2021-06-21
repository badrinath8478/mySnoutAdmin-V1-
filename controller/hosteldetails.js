const mongoose = require("mongoose");
const hosteldetails = require("../model/hosteldetails");
const Hostel = require("../model/hosteldetails");
const admin = require("../model/admin");
const hostelFeatures = require("../model/hostelFeatures");
const pics = require("../model/pics");
const roomsavailable = require("../model/roomsavailable");


exports.Hosteldetails_post = (req, res, next) => {
  const hosteldetails = new Hostel({
    _id: new mongoose.Types.ObjectId(),
    hostelname: req.body.hostelname,
    hostelmobilenumber: req.body.hostelmobilenumber,
    wardenname: req.body.wardenname,
    estbyear: req.body.estbyear,
    noOfFloors: req.body.noOfFloors,
    hosteladress: req.body.hosteladress,
    location: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      area: req.body.area,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      country: req.body.country,
    },
    admin:req.adminId,
  });
  hosteldetails
    .save()
    .then((result) => {
      admin.findById(req.adminId).then((admin) => {
        admin.hostel = hosteldetails._id;
        admin.save();
      });
      return res.status(201).json({ success: result });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


//route to get hostel details
exports.Hosteldetails_get = (req, res, next) => {
   hosteldetails
    .find({admin: req.adminId} )
    .populate("hostelFeatures")
    .populate("hostelPics")
    .populate("roomsAvailable")
    .populate("adress")
    .exec()
    .then((result) => {
      return res.status(201).json({ success: result });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.Hosteldetails_put = (req, res, next) => {
  hosteldetails
    .findOne({ admin: req.adminId})
    .then((post) => {
      post.estbyear = req.body.estbyear;
      post.wardenname = req.body.wardenname;
      post.hostelmobilenumber = req.body.hostelmobilenumber;
      post.hostelname = req.body.hostelname;
      post.noOfFloors = req.body.noOfFloors;
      post.hosteladress = req.body.hosteladress;
      post.location.area = req.body.area;
      post.location.city = req.body.city;
      post.location.pincode = req.body.pincode;
      post.location.state = req.body.state;
      post.location.country = req.body.country;
      post.location.latitude = req.body.latitude;
      post.location.longitude = req.body.longitude;
      return post.save();
    })
    .then((result) => {
      res.status(201).json({ success: process.env.POST_UPDATED });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
