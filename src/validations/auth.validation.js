const Joi = require('joi');
const { password } = require('./custom.validation');

const registerUser = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().allow(''),
		mobile: Joi.number().required(),
		password: Joi.string().required().custom(password)
	})
};

const login = {
	body: Joi.object().keys({
		mobile: Joi.number().required(),
		password: Joi.string().required()
	})
};

const socialLogin = { body: Joi.object().keys({ token: Joi.string().required() }) };



module.exports = { registerUser, login, socialLogin };