const mongoose = require('mongoose');

const subjectService = require('../services/subjectService');


function addSubjects(req,res){
    try{
        subjectService.addSubjects(req,function(successData){
            res.send(successData);
        },function(errorData){
            res.send(errorData);
        })
    } catch(error){
        res.send(RESPONSE.internalServerError(error.message));
    }
}



function getSubjets(req,res){
    try{
        subjectService.getSubjets(req,function(successData){
            res.send(successData);   
        },function(errorData){
            res.send(errorData);
        })  
    } catch(error){
        res.send(RESPONSE.internalServerError(error.message));
    }
}



async function removeSubject(req,res,next){    
    let {id} = req.params;
    let result = await Subject.findOneAndRemove({_id:id});
    if(!result){
            return res.send(Response.sendResponse(false,null,CUSTOM_MESSAGE.RECORD_DELETED_FAILURE,STATUS_CODE.NOT_MODIFIED))
    } else {
        return res.send(Response.sendResponse(true,result,CUSTOM_MESSAGE.RECORD_DELETED_SUCCESS,STATUS_CODE.OK))
    }
}


module.exports.getSubjets = getSubjets;
module.exports.addSubjects = addSubjects;
module.exports.removeSubject = removeSubject;