
const express = require("express");
const router = express.Router();
const multer = require('multer');
const imageController = require('../controller/hostelpics');
const path = require('path');

const newLocal = './public/files';
/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: newLocal,
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 
//init
var upload =  multer({
  storage: storageEngine,
  limits: { fileSize:200000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
});
var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}
// router.get("/", imageController.products_get_all);

router.post("/", upload.array('Image'), imageController.products_create_product);

// router.get("/:productId", imageController.products_get_product);

// router.patch("/:productId", imageController.products_update_product);

// router.delete("/:productId",  imageController.products_delete);

module.exports = router;