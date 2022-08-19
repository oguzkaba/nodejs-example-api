const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Generating JWT
router.post("/login", userController.login);

module.exports = router;