'use strict';

var User = require('../models/users')

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	//var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.render('index');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});
		
	app.route('/poll')
		.get(function (req, res) {
			res.render('poll');
		});	

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile/:id')
		.get(isLoggedIn, function (req, res) {
			console.log(req.params);
			User.findOne({"twitter.username":req.params.id}, function(err, user) {
				console.log(user);
				//user = JSON.stringify(user);
				res.render('profile',{user:user, time:Date.now(), layout:false});
			})
			//res.sendFile(path + '/public/profile.html');
		});
		
	app.route('/createpoll')
		.get(isLoggedIn, function (req, res) {
			res.render('createpoll');
		});	

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("profile",{user:req.user, layout:false});
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));	

	/*app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);*/
		
	app.route('/createpoll')
		.post(pollHandler.addPoll);
		
	app.route('/success')
		.get(function (req, res) {
		//console.dir(req.body);
		res.render('success');
		});
//agasg
		
};
