// dependencies
const { OAuth2Client } = require("google-auth-library");
// environment
const config = require("../config/environment");


/**
 * verify google user using token.
 * @param {String} idToken - .
 * @returns {GoogleUser}.
 */
const verifyGoogleUser = async (idToken) => {
    const oAuth2Client = new OAuth2Client(config.socialLogin.google.clientId);
    const ticket = await oAuth2Client.verifyIdToken({
        idToken: idToken,
        audience: config.socialLogin.google.clientId,
    });
    const user = ticket.getPayload();
    return user;
};

/**
 * verify facebook user using token.
 * @param {String} idToken - .
 * @returns {facebookUSer}.
 */
const verifyFacebookUser = async (idToken) => {
    let facebook;
    try {
        facebook = await axios.get(
            `https://graph.facebook.com/me?access_token=${idToken}&fields=id,name,email`
        );
        if (!facebook.data) {
            throw new Error("Invalid facebook session");
        }
    } catch (error) {
        console.log(error);
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            (() => {
                try {
                    return error.response.data.error.message;
                } catch (e) {
                    return "Something went wrong";
                }
            })()
        );
    }

    return facebook.data;
};



module.exports = { verifyGoogleUser, verifyFacebookUser };