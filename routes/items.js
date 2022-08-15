const express = require('express');
const router = express.Router();
const items = require('../services/items');


/* GET items. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await items.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
  }
});

/* POST item */
router.post('/', async function (req, res, next) {
  try {
    res.json(await items.create(req.body));
  } catch (err) {
    console.error(`Error while creating item`, err.message);
    next(err);
  }
});

/* PUT item */
router.put('/:id', async function (req, res, next) {
  try {
    res.json(await items.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating item`, err.message);
    next(err);
  }
});

/* DELETE item */
router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await items.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;