const express = require('express');
const router = express.Router();
const persons = require('../services/persons');

/* GET persons. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await persons.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting persons `, err.message);
    next(err);
  }
});

/* POST person */
router.post('/', async function(req, res, next) {
  try {
    res.json(await persons.create(req.body));
  } catch (err) {
    console.error(`Error while creating person`, err.message);
    next(err);
  }
});

/* PUT person */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await persons.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating person`, err.message);
    next(err);
  }
});

/* DELETE person */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await persons.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

module.exports = router;