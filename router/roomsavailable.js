const express = require("express");
const router = express.Router();
const roomsAvailableController = require('../controller/roomsavailable');

const isAuth = require('../middleware/auth');



router.post("/",isAuth, roomsAvailableController.roomsAvailable_post);



router.delete("/:roomId",isAuth, roomsAvailableController.roomsAvailable_delete);

router.put("/:roomId",isAuth, roomsAvailableController.roomsAvailable_put);


module.exports = router;