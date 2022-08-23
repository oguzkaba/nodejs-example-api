const users = require('../services/user.service');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const validate = require('../utils/string.util');

dotenv.config();

async function login(req, res, next) {
    try {

        if (validate.stringValidate(req.body.userName) || validate.stringValidate(req.body.userPassword)) {

            const data = await users.login(req.body.userName, req.body.userPassword);

            if (data.length > 0) {
                if (data[0].userActual == 1) {
                    // Then generate JWT Token
                    let jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const token = jwt.sign(data[0].userName + data[0].userPassword + Date.now(), jwtSecretKey);
                    res.json({ token: token });
                } else {
                    res.json({ message: 'Login Failed: User is passive. Contact your administrator to update' });
                }
            } else {
                res.status(401).json({ message: 'Login Failed: Your user name or password is incorrect' });
            }

        } else {
            res.json({ "Failed:": "Null" });
        }
    } catch (err) {
        console.error(`Failed: something went wrong`, err.message);
        next(err);
    }
}

async function register(req, res, next) {
    try {
        // Then generate JWT Token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(req.body.userName + req.body.userPassword + Date.now(), jwtSecretKey);
        res.json(await users.register(req.body, token));
    } catch (err) {
        console.error(`Error while creating item`, err.message);
        next(err);
    }
}

module.exports = { login, register }


