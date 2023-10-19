const { Address } = require("../models");

/**
 * Creates a new order.
 * @param  {Object} addressBody - address.
 * @returns {Promise<createAddress>}
 */
const createAddress = (addressBody) => Address.create(addressBody);

module.exports = { createAddress };