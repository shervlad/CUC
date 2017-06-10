var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('upload_question',{});
});


router.post('/submit', function(req, res, next) {
  console.log('hello')
  var Question = require('../models/question');
  var thisQuestion = new Question(req.body);
  thisQuestion.save(function(err){
    if(err) console.log('an Error occured when trying to upload question to database');
  })
  res.redirect('back');
  next();
});

module.exports = router;
