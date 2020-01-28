const jwt = require('jsonwebtoken');
const JwtToken = require("../models/jwtToken.model");
module.exports = async(req, res, next) => {
    try {
        //console.log(req.headers.authorization)
        const token = req.headers.authorization;
        const isValid = await JwtToken.findOne({token : token})
        if(!isValid){
        return res.send(Response.sendResponse(false, "", CUSTOM_MESSAGE.AUTH_FAILED, STATUS_CODE.INTERNAL_SERVER_ERROR));  
        }
        else{
            const decoded = jwt.verify(token, ENVCONFIG.jwtKey);
            req.userData = decoded;
            next();
        }
    } catch (error) {
        return res.send(Response.sendResponse(false, "", CUSTOM_MESSAGE.AUTH_FAILED, STATUS_CODE.INTERNAL_SERVER_ERROR));
    }
};