const express = require("express");
const router = express.Router();
const LocationController = require("../controller/hostelLocation");


router.post("/", LocationController.location_post);

router.get("/:locationId", LocationController.location_get);

router.put("/:locationId", LocationController.location_put);

router.delete("/:locationId", LocationController.location_delete);




module.exports = router;