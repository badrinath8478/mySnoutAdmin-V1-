
const mongoose = require("mongoose");
const RoomsAvailable = require("../model/roomsavailable");


exports.roomsAvailable_post = (req, res, next) => {
  const roomsAvailable = new RoomsAvailable({
    _id: new mongoose.Types.ObjectId(),
    no_of_people_per_room : req.body.no_of_people_per_room,
    room_type : req.body.room_type,
    price : req.body.price,
    rooms_available : req.body.rooms_available,
    roomSize: req.body.roomSize
    });
  roomsAvailable.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message:"sucess",
      result : result
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};


// exports.ac_get_all = (req, res, next) => {
//   Ac.find()
//     .select("no_of_people_per_room _id ")
//     .exec()
//     .then(docs => {
//       const response = {
//         count: docs.length,
//         ac : docs.map(doc => {
//           return {
//             ac: doc.ac,
//            _id: doc._id,
            
//           };
//         })
//       };
//       if (docs.length >= 0) {
//         res.status(200).json(response);
//       } else {
//         res.status(404).json({
//           message: 'No entries found'
//         });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };



exports.roomsAvailable_get = (req, res, next) => {
    const id = req.params.roomsAvailableId;
    RoomsAvailable.findById(id)
      .select(" _id  ")
      .exec()
      .then(doc => {
        console.log(doc);
        if (doc) {
          res.status(200).json({
            ac : doc.ac,
            fan: doc.fan,
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
  
  
  
  
  exports.roomsAvailable_delete = (req, res, next) => {
    const id = req.params.roomsAvailableId;
    RoomsAvailable.remove({ _id: id })
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
  
 
  exports.roomsAvailable_put = (req, res, next) => {
    id = req.params.roomsAvailableId;
    RoomsAvailable.findById(id)
      .then(post => {
        console.log(post);
        post.no_of_people_per_room = req.body.no_of_people_per_room;
        post.room_type = req.body.room_type;
        post.price = req.body.price;
        post.rooms_available = req.body.rooms_available;
        post.roomSize = req.body.roomSize;
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