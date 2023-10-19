// dependencies
const httpStatus = require("http-status");
// utils
const asyncRequest = require("../utils/requestHandler");
// services
const { userService } = require("../services");

const getUser = asyncRequest((req, res) => {
	res.status(httpStatus.OK).send(req.user);
});

const updateUser = asyncRequest(async (req, res) => {
	const user = await userService.updateUserById(req.user._id, req.body);
	res.status(httpStatus.ACCEPTED).send(user);
});

const updatePassword = asyncRequest(async (req, res) => {
	const user = await userService.updatePassword(req.user._id, req.body);
	res.status(httpStatus.ACCEPTED).send(user);
});

module.exports = { updateUser, getUser, updatePassword };