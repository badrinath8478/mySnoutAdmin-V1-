const express = require("express");
const router = express.Router();
const HostelFeaturesController = require('../controller/hostelFeatures');


router.post("/",HostelFeaturesController.HostelFeatures_post);
router.get("/:HostelFeaturesId",HostelFeaturesController.HostelFeatures_get);
router.delete("/:HostelFeaturesId",HostelFeaturesController.HostelFeatures_delete);
router.put("/:HostelFeaturesId",HostelFeaturesController.HostelFeatures_put);


module.exports = router;