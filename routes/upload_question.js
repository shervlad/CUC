var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('upload_question', {});
});

router.post('/submit', ensureAuthenticated, function(req, res, next) {
    console.log('hello')
    var Question = require('../models/question');
    var thisQuestion = new Question(req.body);
    thisQuestion.save(function(err) {
        if (err) console.log('an Error occured when trying to upload question to database');
    })
    res.redirect('back');
    next();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;
