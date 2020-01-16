const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');

router.post('/addSubject',subjectController.addSubjects);

router.get('/subject',subjectController.getSubjets);



module.exports = router;