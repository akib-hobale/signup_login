const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require('../models/user.model');


/*-------------------------- User signup ------------------------*/
function signup(req, res, next) {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        first_name:req.body.first_name
                    });
                    user
                        .save()
                        .then(result => {
                            
                            res.status(201).json({
                                message: "User created"
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    });
}


/*---------------------- User Login ---------------------------------*/
function login(req, res, next) {
    
        User.findOne({email:req.body.email})
        .exec(function(err,user){
            if(err){
                return res.status(500).json({
                    error: err
                });
            } else if(!user){
                return res.status(401).json({
                    message:"User not found"
                })
            }

            bcrypt.compare(req.body.password,user.password,function (err,result){
                if(result === true){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id,
                        first_name:user.first_name
                    },
                    ENVCONFIG.jwtKey, {
                        expiresIn: "1h"
                    }
                );
               return res.status(200).json({
                    message:"User Login Successfully",
                    Token:token
                })
                }

               return res.status(500).json({
                   message:"Failed to authenticate"
               })
            })
        })
}



module.exports.signup = signup;
module.exports.login = login;