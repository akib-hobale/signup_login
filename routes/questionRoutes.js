const express = require("express");
const router = express.Router();

const questionController = require('../controller/questionController');

router.post('/',questionController.addQuestions);

router.get('/',questionController.getQuestions);

module.exports = router;