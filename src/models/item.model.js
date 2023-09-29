const mongoose = require('mongoose');
const { paginate } = require('./plugins');


const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            require: true
        },
        unit: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        images: [{
            type: mongoose.Schema.ObjectId,
            ref: "images"
        }],
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps: true,
    }
);

// // Custom method to populate and modify the images field
// itemSchema.methods.populateAndModifyImages = async function () {
//     const item = this;
//     const populatedItem = await item.populate({
//         path: 'images',
//         select: '_id filename path', // Only select the path field from the Image documents
//     }).execPopulate();

//     // Modify the path field of the populated images as needed
//     populatedItem.imageIds = populatedItem.imageIds.map(image => {
//         // Modify the path here, for example, adding a prefix
//         image.path = `/custom-prefix${image.path}`;
//         return image;
//     });

//     return populatedItem;
// };


// apply plugins on schema
itemSchema.plugin(paginate);


/**
 * @typedef Items
 */
const Items = mongoose.model('items', itemSchema);

module.exports = Items;