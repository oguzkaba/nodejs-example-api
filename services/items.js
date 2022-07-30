const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM items ORDER BY id ASC LIMIT ${offset},${config.listPerPage}`
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
 * @param {object} item The object
 */

async function create(item) {

  const result = await db.query(
    `INSERT INTO items (name, description, quantity) VALUES ("${item.name}", "${item.description}", ${item.quantity})`
  );

  let message = 'Error in creating items';

  var data=item
  
  if (result.affectedRows) {
    message = 'Item created successfully';
  }

  return { message,data };
}

async function update(id, item) {
  const result = await db.query(
    `UPDATE items SET name="${item.name}", description="${item.description}", quantity=${item.quantity} WHERE id=${id}`
  );

  let message = 'Error in updating item';

  if (result.affectedRows) {
    message = 'Item updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM items WHERE id=${id}`
  );

  let message = 'Error in deleting item';

  if (result.affectedRows) {
    message = 'Item deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}