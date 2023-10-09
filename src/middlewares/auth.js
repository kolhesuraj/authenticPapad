const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { tokenService, userService } = require('../services');

// Access token authentication middleware
const auth = async (req, _res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];

		// check access token
		if (!token) {
			next(new ApiError(httpStatus.UNAUTHORIZED, 'Please add Access Token.'));
		}
		// if token exists then verify
		const payload = await tokenService.verifyToken(token);

		// set user
		const user = await userService.getUserByID(payload.sub);
		req.user = user;
		next();
	} catch (err) {
		next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
	}
};

// check for admin role
const adminAuth = (req, _res, next) => {
	try {
		// get user role from req.user
		const userRole = req.user.role;

		// check user role
		if (userRole !== 'admin') {
			next(new ApiError(httpStatus.UNAUTHORIZED, 'You are not admin! Please login with admin'));
		}

		// if user is admin
		next();
	} catch (error) {
		next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Something went's wrong!`));
	}
};

module.exports = { auth, adminAuth };