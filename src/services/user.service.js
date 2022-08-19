const db = require('./db.service');
const helper = require('../../helper');

async function login(userName, userPassword) {
    const rows = await db.query(
        `SELECT * FROM user WHERE userName="${userName}" AND userPassword="${userPassword}"`
    );
    const data = helper.emptyOrRows(rows);

    return data
}

module.exports = { login }