const express = require('express');
const router = express.Router();
const personController = require('../controllers/persons.controller');


/* GET persons. */
router.get('/', personController.get);

/* POST person */
router.post('/', personController.create);

/* PUT person */
router.put('/:id', personController.update);

/* DELETE person */
router.delete('/:id', personController.remove);

module.exports = router;