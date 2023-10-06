const Joi = require('joi');

const registerUser = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().allow(''),
		mobile: Joi.number().required(),
		password: Joi.string().required()
	})
};

const login = {
	body: Joi.object().keys({
		mobile: Joi.number().required(),
		password: Joi.string().required()
	})
};



module.exports = { registerUser, login };