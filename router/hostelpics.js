const express = require("express");
const router = express.Router();
const multer = require('multer');
const imageController = require('../controller/hostelpics');
const isAuth = require('../middleware/auth');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
  }
  const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
  
      if (isValid) {
        uploadError = null
      }
      cb(uploadError, 'public/files')
    },
    filename: function (req, file, cb) {
  
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${Date.now()}.${extension}`)
    }
  })
  var upload = multer({ storage: storageEngine })
  var cpUpload = upload.fields([{ name: 'hostelImages', maxCount: 10, minCount: 6}, { name: 'menuPics', maxCount: 2 }, { name: 'kitchenPics', maxCount: 5,minCount : 3 }])
  
  

router.post("/",isAuth, cpUpload, imageController.create_images);


router.put("/",isAuth, cpUpload,imageController.update_images);


module.exports = router;