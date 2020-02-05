const Answers = require('../models/answers.model');

async function answerService(req,successData,errorData){
    try{
        const {questionId,answer,answer_type} = req.body;
        let answers = new Answers({
            questionId:questionId,
            answer:answer,
            answer_type:answer_type
        })
        let result = await answers.save();
        if(!result){
            return errorData(RESPONSE.sendResponse(false,"",CUSTOM_MESSAGE.FAILED_TO_CREATE,STATUS_CODE.BAD_REQUEST))
        } else 
        {
            return successData(RESPONSE.sendResponse(true,"",CUSTOM_MESSAGE.RECORD_CREATED,STATUS_CODE.CREATED))
        }

    } catch(error){
        return errorData(RESPONSE.sendResponse(false, "", error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


module.exports.answerService = answerService;