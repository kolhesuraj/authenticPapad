// dependencies
const httpStatus = require("http-status");
// utils
const asyncRequest = require("../utils/requestHandler");
// services
const { imageService } = require("../services");
// util
const ApiError = require("../utils/ApiError");


const getImage = asyncRequest(async (req, res) => {
    const image = imageService.readImage(req.params.imageName);
    res.setHeader('Content-Type', 'image/jpeg');
    res.end(image);
});



module.exports = { getImage };