const express = require("express");
const router = express.Router();
const HostelFeaturesController = require('../controller/hostelFeatures');
const isAuth = require('../middleware/auth');

router.post("/",isAuth,HostelFeaturesController.HostelFeatures_post);

router.put("/",isAuth,HostelFeaturesController.HostelFeatures_put);


module.exports = router;