const express = require("express");
const router = express.Router();
const roomsAvailableController = require('../controller/roomsavailable');


router.post("/",roomsAvailableController.roomsAvailable_post);

router.get("/:roomsAvailableId",roomsAvailableController.roomsAvailable_get);

router.delete("/:roomsAvailableId",roomsAvailableController.roomsAvailable_delete);

router.put("/:roomsAvailableId",roomsAvailableController.roomsAvailable_put);
module.exports = router;