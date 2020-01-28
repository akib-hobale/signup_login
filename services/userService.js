const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const JwtToken = require("../models/jwtToken.model");

async function signup(req, successData, errorData) {
    try {
        let users = await User.findOne({ email: req.body.email });
        if (users) {
            return errorData(RESPONSE.sendResponse(false, "", CUSTOM_MESSAGE.USER_EXIST, STATUS_CODE.UNPROCESSABLE))
        }

        let hash = await bcrypt.hash(req.body.password, 10);
        //make email string in to lowercase
        req.body.email = req.body.email.toLowerCase();
        //create new user.
        const user = new User({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            password: hash,
            role: req.body.role
        });

        let result = await user.save();

        //jwt token create
        const token = jwt.sign({
            email: result.email,
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
        return successData(RESPONSE.sendResponse(true, "", CUSTOM_MESSAGE.RECORD_CREATED, STATUS_CODE.OK));

    } catch (error) {
        return errorData(RESPONSE.sendResponse(false, "", error.message, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
}

module.exports.signup = signup;