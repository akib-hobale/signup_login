const authService = require('../services/authService');


function loginUser(req, res) {
    try {
        authService.loginUser(req, function(successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData);
        });
    } catch (error) {
        console.log(error)
        res.send(RESPONSE.internalServerError(error.message));
    }
}

module.exports.loginUser = loginUser; 