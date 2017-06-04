var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cuc');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Could not connect to DataBase'));

router.post('/', function(req, res, next) {
  var Question = require('../models/question');
  var thisQuestion = new Question(req.body);
  thisQuestion.save(function(err){
    if(err) console.log('an Error occured when trying to upload question to database');
  })
  res.redirect('back');
  next();
});

module.exports = router;
