const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/',userController.signup);

router.post('/',userController.login);

module.exports = router;