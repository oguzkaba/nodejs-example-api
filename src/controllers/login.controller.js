const jwt = require('jsonwebtoken');

function login(req, res) {
    // Validate User Here
    // Then generate JWT Token
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = req.body;
    
    const token = jwt.sign(data, jwtSecretKey);

    res.json({ token: token });
}

module.exports={
    login
}