const db = require('./db.service');
const helper = require('../../helper');

async function login(userName, userPassword) {
    const rows = await db.query(
        `SELECT * FROM user WHERE userName="${userName}" AND userPassword="${userPassword}"`
    );
    const data = helper.emptyOrRows(rows);

    return data
}

/**
 * @param {object} user The object
 */

async function register(user, token) {

    const result = await db.query(
        `INSERT INTO user (userName, userPassword, userActual, LevelId, PersonnelId, DepartmentId ) 
            VALUES ("${user.userName}", "${user.userPassword}", "${user.userActual}", "${user.LevelId}", "${user.PersonnelId}", "${user.DepartmentId}")`
    );

    let message = 'Error in creating items';

    if (result.affectedRows) {
        message = 'User register successfully';
    }

    return { message, token };
}

module.exports = { login, register }