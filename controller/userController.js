
const userService = require('../services/userService');



function signup(req, res) {
    try {
        userService.signup(req, function (successData) {
            res.send(successData);
        }, function (errorData) {
            res.send(errorData)
        })
    } catch (error) {
        res.send(RESPONSE.internalServerError(error.message));
    }
}


// /*-------------------------- User signup ------------------------*/
// function signup(req, res, next) {
//     console.log(req.body, "New Data")
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: "Mail exists",
//                     success: false
//                 });
//             } else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         return res.status(500).json({
//                             error: err,
//                             success: false
//                         });
//                     } else {
//                         const user = new User({
//                             _id: new mongoose.Types.ObjectId(),
//                             email: req.body.email,
//                             password: hash,
//                             first_name: req.body.first_name
//                         });
//                         user
//                             .save()
//                             .then(result => {

//                                 res.status(201).json({
//                                     message: "User created",
//                                     success: true
//                                 });
//                             })
//                             .catch(err => {
//                                 console.log(err);
//                                 res.status(500).json({
//                                     error: err,
//                                     success: false
//                                 });
//                             });
//                     }
//                 });
//             }
//         });
// }



module.exports.signup = signup;