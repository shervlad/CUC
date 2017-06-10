var express = require('express');
var router = express.Router();
var question  = require('../models/question');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  question.find({},function(err,qs){
    res.render('index', { title: 'Express',questions:qs});
  })

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
module.exports = router;
