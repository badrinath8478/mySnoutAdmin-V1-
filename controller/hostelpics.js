const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const hosteldetails = require("../model/hosteldetails");
const Pics = require("../model/pics");


//post images
exports.create_images = (req, res, next) => {
  const image = new Pics({
    _id: new mongoose.Types.ObjectId(),
    hostelImages: req.files["hostelImages"].map((file) => file.path),
    kitchenPics: req.files["kitchenPics"].map((file) => file.path),
    menuPics: req.files["menuPics"].map((file) => file.path),
  });
  image
    .save()
    .then((images) => {
      hosteldetails.findOne({ admin: req.adminId }).then((result) => {
        result.hostelPics = image._id;
        result.save();
      });
      return res.status(201).json({ success: images });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};


exports.update_images = (req, res, next) => {
  const files = req.files["hostelImages"].map((file) => file.path);
  const kitchenPics = req.files["kitchenPics"].map((file) => file.path);
  const menuPics = req.files["menuPics"].map((file) => file.path);
  hosteldetails.findOne({ admin: req.adminId }, (err, details) => {
    if (err) {
      return res.status(201).json({ error: err });
    } else {
      Pics.findOneAndUpdate(
        { _id: details.hostelPics },
        {
          $set: {
            hostelImages: files,
            kitchenPics: kitchenPics,
            menuPics: menuPics,
          },
        },
        { new: true }
      )
        .then((result) => {
          res.status(201).json({ success: process.env.POST_UPDATED });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    }
  });
};



