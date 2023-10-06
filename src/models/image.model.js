const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	filename: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	}
});

/**
 * @typedef Image
 */
const Image = mongoose.model('images', imageSchema);



module.exports = Image;