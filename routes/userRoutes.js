const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/Signup',userController.signup);

router.post('/login',userController.login);


module.exports = router;