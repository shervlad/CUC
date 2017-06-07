var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Register Route */
router.get('/register',function(req,res,next){
  res.render('register');
  next();
});

/* Log-In Route */
router.get('/login',function(req,res,next){
  res.render('login');
  next();
})
module.exports = router;
module.exports = router;
