
const userService = require('../services/userService');



function signup(req, res) {
    try {
        userService.signup(req, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData)
        })
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

module.exports.signup = signup;