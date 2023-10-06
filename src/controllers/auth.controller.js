// dependencies
const httpStatus = require("http-status");
// utils
const asyncRequest = require("../utils/requestHandler");
const ApiError = require("../utils/ApiError");
// services
const { authService, tokenService } = require("../services");


const registerUser = asyncRequest(async (req, res) => {
    const user = await authService.registerUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const login = asyncRequest(async (req, res) => {
    const { mobile, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(mobile, password);
    const { token, expires } = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.ACCEPTED).send({ user, token, expires });
});

const socialLogin = asyncRequest(async (req, res) => {
    const provider = (req.params.provider).tolowercase();
    const idToken = req.body.token;
    let user;
    switch (provider) {
        case 'google':
            user = authService.loginWithGoogle(idToken);
            break;
        case 'facebook':
            user = authService.loginWithFacebook(idToken);
            break;
        default:
            throw new ApiError(httpStatus.NOT_FOUND, ` ${provider} Provider Not Found`);
    }
    const { token, expires } = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.ACCEPTED).send({ user, token, expires });
});

const socialRegistration = asyncRequest(async (req, res) => {
    const provider = (req.params.provider).tolowercase();
    const idToken = req.body.token;
    let user;
    switch (provider) {
        case 'google':
            user = authService.registerUserWithGoogle(idToken);
            break;
        case 'facebook':
            user = authService.registerUserWithFacebook(idToken);
            break;
        default:
            throw new ApiError(httpStatus.NOT_FOUND, ` ${provider} Provider Not Found`);
    }
    res.status(httpStatus.CREATED).send(user);
});



module.exports = { registerUser, socialRegistration, login, socialLogin };