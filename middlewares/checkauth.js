const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
// Verification of JWT
module.exports = ("/checkAuth", (req, res, next) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        console.log(verified);

        if (verified) {
            next();
        }
        else {
            return res.status(401).json({ "status": "401", "message": "Access Denied" });
        }


    } catch (error) {
        // Access Denied
        return res.status(401).json({ "status": "401", "message": "Access Denied" });
    }
});
