const answerService = require('../services/answerService');

function addAnswers(req,res){
    try{
        answerService.answerService(req,function(sucessData){
            res.send(sucessData);
        },function(errorData){
            res.send(errorData);
        })  
    } catch(error){
        return res.send(RESPONSE.internalServerError(error.message))
    }
}

module.exports.addAnswers = addAnswers;