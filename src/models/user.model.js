/* eslint-disable func-names */
/* eslint-disable require-await */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { privates } = require('./plugins');


const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Invalid email');
				}
			}
		},
		mobile: {
			type: Number,
			require: true
		},
		password: {
			type: String,
			require: true,
			private: true
		}
	},
	{ timestamps: true }
);


/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

// apply plugins for schema
userSchema.plugin(privates);

/**
 * @typedef User
 */
const User = mongoose.model('user', userSchema);

module.exports = User;