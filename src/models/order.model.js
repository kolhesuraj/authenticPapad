const mongoose = require('mongoose');
const { paginate } = require('./plugins');


const statusType = {
    placed: "placed",
    preparing: "preparing",
    readyToDeliver: "readyToDeliver",
    deliver: "deliver",
    canceled: "canceled"
};

const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            },
        },
        mobile: {
            type: Number,
            require: true
        },
        address: {
            line1: {
                type: String,
                require: true
            },
            line2: {
                type: String
            },
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
        items: [{
            item: {
                type: mongoose.Types.ObjectId,
                ref: "items"
            },
            quantity: {
                type: Number,
                require: true
            }
        }],
        status: {
            type: String,
            enum: Object.keys(statusType),
            default: "placed"
        }
    },
    {
        timestamps: true,
    }
);

// apply plugins on schema
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('orders', orderSchema);

module.exports = Order;