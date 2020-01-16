const mongoose = require('mongoose');

const Subject = require('../models/subject.model');


async function addSubjects(req,res,next){

    try{
        let {subjectName} = req.body;
        
        subjectName = subjectName.toUpperCase();
        let findSubject = await Subject.findOne({subjectName:subjectName});
       
        if(findSubject){
            return res.send(Response.sendResponse(false,"",CUSTOM_MESSAGE.SUBJECT_ALREADY_EXIST,STATUS_CODE.FOUND));
        } else {
          
            let subject = new Subject({
                _id: new mongoose.Types.ObjectId(),
                subjectName:req.body.subjectName
            })
            let result = await subject.save();  
    
            return res.send(Response.sendResponse(true,result,CUSTOM_MESSAGE.RECORD_CREATED,STATUS_CODE.OK));
        
        } 


    } catch(error){
        return res.send(Response.sendResponse(false,null,error.message,STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

async function getSubjets(req,res,next){
    try{
        let allSubject = await Subject.findAll({});
        if(!allSubject){
            // return res.status(400).json({
            //     message:"Data Not Found",
            //     success: false
            // })
            return res.send(Response.sendResponse(false, "", CUSTOM_MESSAGE.RECORD_NOT_FOUND, STATUS_CODE.NOT_FOUND))
        } else {
            // return res.status(200).json({
            //     message:"Data get Successfully",
            //     success:true,
            //     data:allSubject
            // })
            return res.send(Response.sendResponse(true, allSubject, CUSTOM_MESSAGE.GET_ALL_RECORDS, STATUS_CODE.OK));
        }

    } catch(error){
    //    return res.status(500).json({
    //        message: "Server Error"
    //    })
        return res.send(Response.sendResponse(false, null, error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

module.exports.getSubjets = getSubjets;
module.exports.addSubjects = addSubjects;