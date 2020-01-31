const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const JwtToken = require("../models/jwtToken.model");

async function signup(req, successData, errorData) {
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

module.exports.signup = signup;