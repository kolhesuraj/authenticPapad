const httpStatus = require("http-status");
const { Order } = require("../models");
const ApiError = require("../utils/ApiError");


/**
 * Creates a new order.
 * @param  {Object} orderBody - information of order to create new order.
 * @returns {Promise<createOrder>}
 */
const createOrder = (orderBody) => {
    return Order.create(orderBody);
};

module.exports = { createOrder };