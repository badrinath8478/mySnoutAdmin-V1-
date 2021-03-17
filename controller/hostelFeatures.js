const mongoose = require("mongoose");
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
    customFacilities: req.body.customFacilities
    
  });
  hostelFeatures.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "success"
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: "field cant be empty"
      });
    });

};








exports.HostelFeatures_get = (req, res, next) => {
  id = req.params.HostelFeaturesId;
  hostelFeatures.findById(id).select(" id ammentis homeRules cleaningServices  facilities security hostelPrefferedFor charges customFacilities hostelAvailableFor ")
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          result: doc
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.HostelFeatures_put = (req, res, next) => {
  id = req.params.HostelFeaturesId;
  HostelFeatures.findById(id)
    .then(post => {


      post.charges = req.body.charges;
      post.ammentis = req.body.ammentis;
      post.cleaningServices = req.body.cleaningServices;
      post.facilities = req.body.facilities;
      post.homeRules = req.body.homeRules;
      post.hostelAvailableFor = req.body.hostelAvailableFor;
      post.hostelPrefferedFor = req.body.hostelPrefferedFor;
      post.security = req.body.security;
      post.customFacilities = req.body.customFacilities
      return post.save();
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post updated!', updated_post: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};



exports.HostelFeatures_delete = (req, res, next) => {
  const id = req.params.HostelFeaturesId;
  HostelFeatures.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: " deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

