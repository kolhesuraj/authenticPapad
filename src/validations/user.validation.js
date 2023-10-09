const Joi = require('joi');
const { password } = require('./custom.validation');

const updateUser = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().allow(''),
		mobile: Joi.string().required()
	})
};

const updatePassword = {
	body: Joi.object().keys({
		oldPassword: Joi.string().required(),
		newPassword: Joi.string().required().custom(password)
	})
};



module.exports = { updateUser, updatePassword };