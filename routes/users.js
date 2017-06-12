var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');


/* GET users listing. */
router.get('/list', ensureAuthenticated, function(req, res, next) {
    User.find({}, function(err, users) {
        res.render('users', {
            users: users
        });
    });
});

router.get('/profile/:userName', ensureAuthenticated, function(req, res, next) {
    console.log(req.params);
    User.findOne({
        'username': req.params.userName
    }, function(err, user) {
        res.render('profile', {
            userProfile: user
        });
    })
});

router.get('/profile', ensureAuthenticated, function(req, res, next) {
    console.log('profile page');
    User.findOne({
        'username': req.user.username
    }, function(err, user) {
        res.render('profile', {
            userProfile: user
        });
    })
});

router.post('/profile/addfriend', ensureAuthenticated, function(req, res, next) {
    console.log('befriending users: ',req.user.username,' and ',req.body.username);
    User.findOne({
        'username': req.user.username
    }, function(err, user1) {
        User.findOne({
            'username': req.body.username
        }, function(err, user2) {
            if (user1.friends) {
                user1.friends.push(user2._id);
            } else {
                user1.friends = [user12._id];
            }
            if (user2.friends) {
                user2.friends.push(user1._id);
            } else {
                user2.friends = [user1._id];
            }
            user1.save(function(err) {
                if (!err) console.log('added  friend!');

            })
            user2.save(function(err) {
                if (!err) console.log('added  friend!');
            })
        })

    })
    res.redirect('back');
});

/* Register Route */
router.get('/register', function(req, res, next) {
    res.render('register');
    next();
});

/* Log-In Route */
router.get('/login', function(req, res, next) {
    res.render('login');
    next();
});

/* Register Route */
router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            friends: []
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now login');

        res.redirect('/users/login');
    }

});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'Unknown User'
                });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', ensureAuthenticated, function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
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
