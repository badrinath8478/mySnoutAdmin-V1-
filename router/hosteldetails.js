const express = require("express");
const router = express.Router();
const HostelController = require("../controller/hosteldetails");


router.post("/",HostelController.hostel_post);

router.get("/:hosteldetailsId",HostelController.hosteldetails_get);

router.put("/:hosteldetailsId",HostelController.hosteldetails_put);

router.delete("/:hosteldetailsId",HostelController.hosteldetails_delete);




module.exports = router;