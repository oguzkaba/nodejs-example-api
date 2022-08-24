const users = require('../services/user.service');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const validate = require('../utils/string.util');

dotenv.config();
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
let jwtSecretKey = process.env.JWT_SECRET_KEY;

async function getAllUsers(req, res, next) {
    const reqToken = req.header(tokenHeaderKey);
    const decodeToken = jwt.decode(reqToken);
    console.log(decodeToken)
    if (decodeToken["role"] == 1) {
        try {
            res.json(await users.getAllUsers(req.query.page));
        } catch (err) {
            console.error(`Error while getting users `, err.message);
            next(err);
        }
    } else {
        res.json({ message: 'Failed: You must be an administrator to get users' });
    }
}

async function login(req, res, next) {
    try {

        if (validate.stringValidate(req.body.userName) || validate.stringValidate(req.body.userPassword)) {

            const data = await users.login(req.body.userName, req.body.userPassword);

            if (data.length > 0) {
                if (data[0].userActual == 1) {
                    // Then generate JWT Token
                    const token = jwt.sign({ "userName": data[0].userName, "role": data[0].LevelId }, jwtSecretKey, { expiresIn: "24h", header: { typ: "JWT", alg: 'HS512' } });
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
    //user is admin?
    const reqToken = req.header(tokenHeaderKey);
    const decodeToken = jwt.decode(reqToken);
    console.log(decodeToken)
    if (decodeToken["role"] == 1) {
        try {
            // Then generate JWT Token
            const token = jwt.sign({ "userName": req.bodyuserName, "role": req.bodyLevelId }, jwtSecretKey, { expiresIn: "24h", header: { typ: "JWT", alg: 'HS512' } });
            res.json(await users.register(req.body, token));
        } catch (err) {
            console.error(`Error while creating item`, err.message);
            next(err);
        }
    } else {
        res.json({ message: 'Failed: You must be an administrator to add users' });
    }
}

module.exports = { getAllUsers, login, register }


