const questionService = require('../services/questionService');

function addQuestions(req,res){
    try{
        questionService.addQuestions(req,function(successData){
            res.send(successData);  
        },function(errorData){
            res.send(errorData);
        })
    } catch(error){
        return res.send(RESPONS.internalServerError(error.message));
    }
}

module.exports.addQuestions = addQuestions;