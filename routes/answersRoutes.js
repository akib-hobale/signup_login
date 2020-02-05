const express = require('express');
const router = express.Router();
const answerController = require('../controller/answerController')

router.post('/',answerController.addAnswers);

module.exports = router;