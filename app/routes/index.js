'use strict';

var User = require('../models/users');
var Poll = require('../models/polls');
var Choice = require('../models/choices');

//var path = __dirname;
var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.render('login');
		}
	}

	//var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

	app.route('/')
		.get(function (req, res) {
			console.log(req.params);
			Poll.find({}, {}, { sort: { 'created_at' : -1 } }, function(err, poll) {
				console.log(poll);
				res.render('index',{poll:poll});
			})
		});

	app.route('/login')
		.get(function (req, res) {
			console.log(req.params);
			Poll.find({}, {}, { sort: { 'created_at' : -1 } }, function(err, poll) {
				console.log(poll);
			res.render('login',{poll:poll, layout:'loggedout'});
			})
		});
		
	/*app.route('/poll')
		.get(isLoggedIn, function (req, res) {
			console.log(req.params);
			User.findOne({"twitter.username":req.params.id}, function(err, user) {
				res.render('poll');
			})
		});*/

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
				res.render('profile',{user:user, time:Date.now()});
			})
		});
		
	app.route('/createpoll')
		.get(isLoggedIn, function (req, res) {
			console.log(req.params);
			User.findOne({"twitter.username":req.params.id}, function(err, user) {
				res.render('createpoll');
			})
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("profile",{user:req.user});
		});
		
	app.route('/poll/:id')
		.get(function (req, res) {
			Poll.findOne({"_id":req.params.id}, function(err, poll){
				console.log(poll.poll.choices);
				//poll.poll.choices.count++;
				res.render("poll",{poll:poll});	
			})
		})
		.delete(function (req, res) {
			console.log(req);
			Poll.findOne({"_id":req.params.id}, function(err, poll){
				console.log(poll);
				poll.remove();
				res.render("profile",{user:req.user});
			})
		});
		
	app.route('/poll/:id/:choice')
		.post(function (req, res) {
			Poll.findOne({"_id":req.params.id}, function(err, poll){
				Choice.findOneAndUpdate({"_id": req.params.choice}, {$inc : {'count' : 1}});
				res.render("poll",{poll:poll});		
				})
				//console.log(poll.poll.choices);
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
