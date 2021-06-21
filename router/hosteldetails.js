const express = require("express");
const router = express.Router();
const HostelController = require("../controller/hosteldetails");
const isAuth = require('../middleware/auth');




router.post("/",isAuth ,HostelController.Hosteldetails_post);




router.get("/", isAuth,HostelController.Hosteldetails_get);




router.put("/", isAuth, HostelController.Hosteldetails_put);




module.exports = router;