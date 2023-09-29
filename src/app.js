const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const config = require('./config/environment');
const morgan = require('./config/morgan');

const ApiError = require('./utils/ApiError');

const { errorConverter, errorHandler } = require('./middlewares/error.js');
const routes = require('./routes');
const imageRoutes = require('./routes/images.route');

const app = express();

if (config.env !== 'test') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

app.use(
	helmet(),								// Set necessary HTTP headers for app security.
	express.json(),							// JSON requests are received as plain text. We need to parse the json request body.
	express.urlencoded({ extended: true }),	// Parse urlencoded request body if provided with any of the requests
	compression()							// Using gzip compression for faster transfer of response data.
);


// Enable cors to accept requests from any frontend domain, all possible HTTP methods, and necessary items in request headers
app.use(cors());
app.options('*', cors());

// Define routes
app.use('/api', routes);			// business routes
app.use('/uploads', imageRoutes);	// images route

// Send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert error to ApiError, if request was rejected or it throws an error
app.use(errorConverter);

// Handle the error
app.use(errorHandler);

module.exports = app;