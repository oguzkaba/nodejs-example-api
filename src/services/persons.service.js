const db = require('./db.service');
const helper = require('../../helper');
const config = require('../configs/db.config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM person ORDER BY id ASC LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
    dataCount: rows.length
  }
}

/**
 * @param {object} person The object
 */

async function create(person) {

  const result = await db.query(
    `INSERT INTO person (first_name, last_name) VALUES ("${person.first_name}", "${person.last_name}")`
  );

  let message = 'Error in creating person';

  var data=person
  
  if (result.affectedRows) {
    message = 'Person created successfully';
  }

  return { message,data };
}

async function update(id, person) {
  const result = await db.query(
    `UPDATE person SET name="${person.first_name}", "${person.last_name}" WHERE id=${id}`
  );

  let message = 'Error in updating person';

  if (result.affectedRows) {
    message = 'Person updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM person WHERE id=${id}`
  );

  let message = 'Error in deleting person';

  if (result.affectedRows) {
    message = 'Person deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}