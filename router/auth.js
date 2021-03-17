const express = require("express");
const router = express.Router();
const AuthController = require('../controller/auth');


router.put("/",AuthController.auth_post);

router.post("/login",AuthController.login);

// router.get("/:authId",AuthController.auth_get);




module.exports = router;