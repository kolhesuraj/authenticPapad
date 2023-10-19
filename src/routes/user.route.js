const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Token authentication for all routes defined in this file
router.use(auth.auth);

// Routes: get one user, update user
router
	.route("/")
	.get(userController.getUser)
	.patch(validate(userValidation.updateUser), userController.updateUser);

// Routes: update password
router
	.route("/update-password")
	.put(validate(userValidation.updatePassword), userController.updatePassword);

module.exports = router;