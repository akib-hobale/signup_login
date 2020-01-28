const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');

router.post('/addSubject',subjectController.addSubjects);

router.get('/subjectList',subjectController.getSubjets);

router.delete('/removeSubject/:id',subjectController.removeSubject);


module.exports = router;