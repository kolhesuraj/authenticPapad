// dependencies
const express = require('express');
// middleware
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { multerInstance } = require('../middlewares/multer');
// validator
const itemValidation = require('../validations/items.validation');
// controller
const itemController = require('../controllers/items.controller');

const router = express.Router();

// Routes: get Items, create Item
router
	.route('/')
	.get(validate(itemValidation.getItems), itemController.getItems)
	.post(auth.auth('admin'), multerInstance.array('images', 10), itemController.createItem);

// Routes: get one Item, update Item, delete Item
router
	.route('/:itemId')
	.get(validate(itemValidation.getItem), itemController.getItem)
	.patch(auth.auth('admin'), validate(itemValidation.updateItem), itemController.updateItem)
	.delete(auth.auth('admin'), validate(itemValidation.deleteItem), itemController.deleteItem);

module.exports = router;