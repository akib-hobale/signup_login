const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const JwtToken = require("../models/jwtToken.model");

async function signUp(req, successData, errorData) {
    try {

        const {email,first_name,last_name,password,role} = req.body;
        let users = await User.findOne({ email: email });
        if (users) {
            return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.USER_EXIST, STATUS_CODE.UNPROCESSABLE))
        }

        let hash = await bcrypt.hash(password, 10);
        //make email string in to lowercase
        email = email.toLowerCase();
        //create new user.
        const user = new User({
            email: email,
            first_name: first_name,
            last_name:last_name,
            phone_no: phone_no,
            password: hash,
            role: role
        });

        let result = await user.save();

        //jwt token create
        const token = jwt.sign({
            email: email,
            userId: result._id
        },
            ENVCONFIG.jwtKey,
        );

        //token saved in database 
        let saveToken = new JwtToken({
            token: token,
            user: result._id
        });

        await saveToken.save();
        return successData(RESPONSE.sendResponse(true, "", CUSTOM_MESSAGE.USER_REGISTER, STATUS_CODE.OK));

    } catch (error) {
        return errorData(RESPONSE.sendResponse(false, "", error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


async function userInfo(req,successData,errorData){
    try{
            const userId = req.userData;
            let userInformation = await User.findOne({_id:userId.Id},{email:1,first_name:1,last_name:1,phone_no:1,role:1});
            if(!userInformation){
                return errorData(RESPONSE.sendResponse(false,"",CUSTOM_MESSAGE.USER_NOT_EXIST,STATUS_CODE.NOT_FOUND));
            } else{
                return successData(RESPONSE.sendResponse(true,userInformation,CUSTOM_MESSAGE.GET_RECORD_SUCCESS,STATUS_CODE.OK));
            }
    } catch(error){
        return errorData(RESPONSE.sendResponse(false,"",error.message,STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

module.exports.signUp = signUp;
module.exports.userInfo = userInfo;