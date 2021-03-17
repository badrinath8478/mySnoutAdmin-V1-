const mongoose = require("mongoose");
const Location = require("../model/hostelLocation");




exports.location_post = (req, res, next) => {
    const location = new Location({
      _id: new mongoose.Types.ObjectId(),
      coordinates : req.body.coordinates
    });
    location.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
         message : "success",
         data: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
};


exports.location_get = (req, res, next) => {
  id = req.params.locationId;
  location.findById(id).select(" id coordinates")
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

exports.location_put = (req, res, next) => {
  id = req.params.locationId;
  location.findById(id)
    .then(post => {
      post.coordinates = req.body.coordinates;
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



exports.location_delete = (req, res, next) => {
  const id = req.params.locationId;
  location.remove({ _id: id })
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

