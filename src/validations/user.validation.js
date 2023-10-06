const Joi = require('joi');

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
		newPassword: Joi.string().required()
	})
};



module.exports = { updateUser, updatePassword };