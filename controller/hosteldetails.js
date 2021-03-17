const mongoose = require("mongoose");
const Hostel = require("../model/hosteldetails");

exports.hostel_post = (req, res, next) => {
  const hosteldetail = new Hostel({
   
    _id: new mongoose.Types.ObjectId(),
    hostelname: req.body.hostelname,
    hostelmail: req.body.hostelmail,
    hostelmobilenumber: req.body.hostelmobilenumber,
    wardenname: req.body.wardenname,
    doornumber: req.body.doornumber,
    hosteladress: req.body.hosteladress,
    estbyear:req.body.estbyear
    
  });
  hosteldetail.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "sucess"
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: "field required"
      });
    });
};

exports.hosteldetails_get = (req, res, next) => {
  id = req.params.hosteldetailsId;
  hosteldetails.findById(id).select(" id hostelmail estbyear hosteladress doornumber wardenname hostelmobilenumber hostelname")
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

exports.hosteldetails_put = (req, res, next) => {
  id = req.params.hosteldetailsId;
  hosteldetails.findById(id)
    .then(post => {
      post.hostelmail = req.body.hostelmail;
      post.estbyear = req.body.estbyear;
      post.hosteladress = req.body.hosteladress;
      post.doornumber = req.body.doornumber;
      post.wardenname = req.body.wardenname;
      post.hostelmobilenumber = req.body.hostelmobilenumber;
      post.hostelname = req.body.hostelname;
      
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



exports.hosteldetails_delete = (req, res, next) => {
  const id = req.params.hosteldetailsId;
  hosteldetails.remove({ _id: id })
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







//pagination
// exports.wifi_get_all = async( req , res , next )=> {
//   try{
//     const {page = 1,limit = 10}= req.query;
//     const wifi = await Wifi.find().limit(limit*1).skip((page-1)*limit);
//     res.status(200).json({total:wifi.length,wifi});
//   } catch(error){
//     console.log(err);
//     res.status(500).json({
//       error:err
//     });
//   }
// };

