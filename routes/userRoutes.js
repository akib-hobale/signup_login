const express = require('express');
const router = express.Router();
// const auth = require('../middleware/check-auth')
const userController = require('../controller/userController');

const authController = require('../controller/authController');

router.post('/login',authController.loginUser);

router.post('/signup',userController.signup);

// router.post('/login',userController.login);


module.exports = router;