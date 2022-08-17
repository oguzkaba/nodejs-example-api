const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');


/* GET items. */
router.get('/', itemsController.get);

/* POST item */
router.post('/', itemsController.create);

/* PUT item */
router.put('/:id', itemsController.update);

/* DELETE item */
router.delete('/:id', itemsController.remove);

module.exports = router;