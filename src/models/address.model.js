const mongoose = require("mongoose");
const { privates } = require("./plugins");

const addressSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "user"
		},
		line1: {
			type: String,
			require: true
		},
		line2: { type: String },
		city: {
			type: String,
			require: true
		},
		state: {
			type: String,
			require: true
		},
		pinCode: {
			type: Number,
			require: true
		}
	},
	{ timestamps: true }
);

// apply plugins on schema
addressSchema.plugin(privates);

/**
 * @typedef Test
 */
const Test = mongoose.model("address", addressSchema);

module.exports = Test;