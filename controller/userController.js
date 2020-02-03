
const userService = require('../services/userService');



function signUp(req, res) {
    try {
        userService.signUp(req, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData)
        })
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}

function userInfo(req,res){
    try{
        userService.userInfo(req,function(successData){
            res.send(successData);
        },function(errorData){
            res.send(errorData)
        })
    } catch(error){
        res.send(RESPONSE.internalServerError(error.message));
    }
    
}

module.exports.signUp = signUp;
module.exports.userInfo = userInfo;