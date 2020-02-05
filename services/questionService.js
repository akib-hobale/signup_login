const Questions = require('../models/question.model');

async function getQuestions(req, successData, errorData) {
    try {
        const subjectId = req.params.subjectId;

        let questions = await Questions.aggregate([
            { $match: { "_id": ObjectId(subjectId) } }
            , {
                $lookup:
                {
                    from: "questions",
                    localField: "_id",
                    foreignField: "subjectId",
                    as: "question"
                }
            },
            {
                $unwind: "$question"
            },
            {
                $lookup:
                {
                    from: "answers",
                    localField: "question._id",
                    foreignField: "questionId",
                    as: "answer"
                }
            }
            ,
            { $project: { _id: 0, question: "$question.question", questionid: "$question._id", options_list: "$answer" } }
        ]);

        if(!questions){
            return errorData(RESPONSE.sendResponse(false,"",CUSTOM_MESSAGE.RECORD_NOT_FOUND,STATUS_CODE.NOT_FOUND));
        }
        else {
            return successData(RESPONSE.sendResponse(true,questions,CUSTOM_MESSAGE.GET_ALL_RECORDS.STATUS_CODE.OK))
        }

    } catch (error) {
        return errorData(RESPONSE.sendResponse(false, "", error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}



async function addQuestions(req,successData,errorData){
    try{
        const {subjectId,question,description,question_type} = req.body;

        const questions = new Questions({
            subjectId:subjectId,
            question:question,
            description:description,
            question_type:question_type
        });
        let result = await questions.save();
        return successData(RESPONSE.sendResponse(true,"",CUSTOM_MESSAGE.RECORD_CREATED.STATUS_CODE.OK))

    } catch(error){
        return errorData(RESPONSE.sendResponse(false,"",error.message,STATUS_CODE.INTERNAL_SERVER_ERROR))
    }
}
module.exports.addQuestions = addQuestions;
module.exports.getQuestions = getQuestions;