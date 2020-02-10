
const Subject = require('../models/subject.model');


async function addSubjects(req,successData,errorData){
    try{       
        let {subjectName,subjectDescription,examTime,} = req.body;
        
        subjectName = subjectName.toUpperCase();
        let findSubject = await Subject.findOne({subjectName:subjectName});
       
        if(findSubject){
            return errorData(RESPONSE.sendResponse(false,"",CUSTOM_MESSAGE.SUBJECT_ALREADY_EXIST,STATUS_CODE.FOUND));
        } else {          
            let subject = new Subject({
                subjectName:subjectName,
                subjectDescription:subjectDescription,
                examTime:examTime,
                subjectImage:req.file.path
            })
            let result = await subject.save();  
    
            return successData(RESPONSE.sendResponse(true,result,CUSTOM_MESSAGE.RECORD_CREATED,STATUS_CODE.OK));
        
        } 
    } catch(error){
        return errorData(RESPONSE.sendResponse(false,null,error.message,STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}



async function getSubjets(req,successData,errorData){
    try{
        let allSubject = await Subject.find({});
        if(!allSubject){
            return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.RECORD_NOT_FOUND, STATUS_CODE.NOT_FOUND))
        } else {
            return successData(RESPONSE.sendResponse(true, allSubject, CUSTOM_MESSAGE.GET_ALL_RECORDS, STATUS_CODE.OK));
        }

    } catch(error){
        return errorData(RESPONSE.sendResponse(false, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


module.exports.addSubjects = addSubjects;
module.exports.getSubjets = getSubjets;