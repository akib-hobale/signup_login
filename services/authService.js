const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// User model 
const User = require('../models/user.model');
const JwtToken = require("../models/jwtToken.model");


// User Login Api
async function loginUser(req, successData, errorData) {
    try {
       
        let password;
        let token;      
        const formEmail = req.body.email;
        const formPassword = req.body.password; 

        let userRes = await User.findOne({            
                email: formEmail
            });  

        if (!userRes) {
            return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.NO_SUCH_EMAIL, STATUS_CODE.NOT_FOUND));
        }

         password = await checkPassword(formPassword, userRes.password);
         if(password){
            // if('Admin' == userRes.role){
            //     token = await generateJwtToken(userRes, "Admin");                
            // } else if('Mantor' == userRes.role){  
            //     token = await generateJwtToken(userRes, "Mantor");
            // } else {
            //     token = await generateJwtToken(userRes, "User");
            // }
            token = await generateJwtToken(userRes);
            savetoken = await saveToken(token,userRes._id); 
            if(savetoken){
                return successData(RESPONSE.sendResponse(true, {
                    "token": token,
                   // "id": userRes._id,                   
                }, CUSTOM_MESSAGE.LOGIN_SUCCESS, STATUS_CODE.OK));

            } else{
                return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.RECORD_NOT_SAVE, STATUS_CODE.UNPROCESSABLE));
            }

         } else{
            return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.INCORRECT_PASSWORD, STATUS_CODE.FORBIDDEN));
         }

    } catch (error) {
        return errorData(RESPONSE.sendResponse(false, "", error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}


/**
 * @name saveJwtToken
 * @param {*} token
 * @param {*} userId 
 * @description This function save jwt token
 */
async function saveToken(token,userId){
    try{        
        // let user = await JwtToken.findOne({userId:userId});
        // if(!user){
        //     let saveToken = new JwtToken({
        //         token: token,
        //         user: userId
        //       });
        //       saveToken.save();
        //       return true;
        //  } else { 
        //     let result = await JwtToken.updateOne(
        //         {userId:userId},
        //         {$set:{token:token}}
        //         );        

        //         if(result){
        //             return true;
        //           } else {
        //             return false;
        //           }

        //  }


      //remove previous all tokens of users
      await JwtToken.remove({
        userId: userId
      });

      //token saved in database 
      let saveToken = new JwtToken({
                token: token,
                user: userId
              });
    let result = await  saveToken.save();
    if(!result){
        return false
    } else{
        return true
    }
    }catch(error){
           return errorData(RESPONSE.sendResponse(false,"",error.message,STATUS_CODE.INTERNAL_SERVER_ERROR))
    }
}



/**
 * @name checkPassword
 * @param {*} dbPassword 
 * @param {*} password 
 * @description This function checks password against database password
 * and check if it maches or not using  functions
 */
async function checkPassword(dbPassword = '', password = '') {
    try {
       let result = await bcrypt.compare(dbPassword, password);
            if (result === true) {
               return true;               
            } else {
               return false;
            }
      
    } catch (error) {
        return false;
    }
}



/**
 * @name generateJwtToken
 * @param {*} userObj 
 * @description This function generate jwt token
 */
function generateJwtToken(userObj = false) {
    try {   
        if (userObj) {
            let token = jwt.sign({
                first_name: userObj.first_name,
                Id: userObj._id,
                email:userObj.email,
                role:userObj.role 
                },              
                ENVCONFIG.jwtKey,
            );
            return token;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}



module.exports.loginUser = loginUser;