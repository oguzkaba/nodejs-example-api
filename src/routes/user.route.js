const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Generating JWT
router.get("/users", userController.getAllUsers);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;