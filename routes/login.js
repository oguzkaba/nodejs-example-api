const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Generating JWT
router.post("/login", (req, res) => {
    // Validate User Here
    // Then generate JWT Token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = req.body;
    
    const token = jwt.sign(data, jwtSecretKey);

    res.json({ token: token });
});


module.exports = router;
