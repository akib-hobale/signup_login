const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectController');
const file = require('../libs/ImageUpload');

router.post('/addSubject',file.ImageUpload('subjectImage'),subjectController.addSubjects);

router.get('/subjectList',subjectController.getSubjets);

router.delete('/removeSubject/:id',subjectController.removeSubject);


module.exports = router;