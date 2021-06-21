const mongoose = require("mongoose");
const hosteldetails = require("../model/hosteldetails");
const hostelFeatures = require("../model/hostelFeatures");
const HostelFeatures = require("../model/hostelFeatures");


exports.HostelFeatures_post = (req, res, next) => {
 const hostelFeatures = new HostelFeatures({
    _id: new mongoose.Types.ObjectId(),
    charges: req.body.charges,
    ammentis: req.body.ammentis,
    cleaningServices: req.body.cleaningServices,
    facilities: req.body.facilities,
    homeRules: req.body.homeRules,
    hostelAvailableFor: req.body.hostelAvailableFor,
    hostelPrefferedFor: req.body.hostelPrefferedFor,
    security: req.body.security,
    customFacilities: req.body.customFacilities,
  });
  hostelFeatures
    .save()
    .then((features) => {
      hosteldetails.findOne({ admin: req.adminId }).then((result) => {
        result.hostelFeatures = hostelFeatures._id;
        result.save();
      })
      return res.status(201).json({ success: features });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });

};


exports.HostelFeatures_put = (req, res, next) => {
  hosteldetails.findOne({admin:req.adminId},(err,details)=>{
    if (err) {
      console.log(err);
    } else {
      hostelFeatures
      .findOne({_id:details.hostelFeatures})
      .then((post) => {
        post.charges = req.body.charges;
        post.ammentis = req.body.ammentis;
        post.cleaningServices = req.body.cleaningServices;
        post.facilities = req.body.facilities;
        post.homeRules = req.body.homeRules;
        post.hostelAvailableFor = req.body.hostelAvailableFor;
        post.hostelPrefferedFor = req.body.hostelPrefferedFor;
        post.security = req.body.security;
        post.customFacilities = req.body.customFacilities;
        return post.save();
      }) .then((result) => {
        res.status(201).json({ success: process.env.POST_UPDATED });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
    }

  })
};

