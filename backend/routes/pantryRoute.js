var express = require('express');
var router = express.Router();
var pantry = require('../controllers/pantryController');

router.route('/')
.get(pantry.getAllItems)
.post(pantry.createNewItem);
module.exports = router;

router.route('/:id').delete(pantry.deleteItem).put(pantry.updateItem);