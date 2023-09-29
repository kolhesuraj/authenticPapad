const mongoose = require('mongoose');
const { Item } = require('.');

const imageSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
});

// Define a middleware for the Image schema
imageSchema.pre('find', async function () {
    try {
        // Access the document being queried using `this` context
        const image = this;

        image.path = `http://${req.get('host')}${image.path}`;

        // Log the image data
        console.log('Populated image data:', image);
    } catch (error) {
        // Handle errors appropriately
        console.error('Error:', error);
    }
});

/**
 * @typedef Image
 */
const Image = mongoose.model('images', imageSchema);

module.exports = Image;