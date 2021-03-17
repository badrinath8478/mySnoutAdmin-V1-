const mongoose = require("mongoose");
const Pics = require("../model/pics");



exports.products_create_product = async (req, res, next) => {
  var imageurl = req.files.path;
  const image = new Pics({
    _id: new mongoose.Types.ObjectId(),
    images: imageurl
  });
  await image.save()
    .then(result => {
      console.log(req.files);
      console.log(result);
      res.status(201).json({ result: result });
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

};

// exports.products_get_product = (req, res, next) => {
//   const id = req.params.productId;
//   Product.findById(id)
//     .select(" _id productImage")
//     .exec()
//     .then(doc => {
//     if (doc) {
//         res.status(200).json({
//           product: doc
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

// exports.products_update_product = (req, res, next) => {
//   const id = req.params.productId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Product.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Product updated"

//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

// exports.products_delete = (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Product deleted",

//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };