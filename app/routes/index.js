'use strict';

var User = require('../models/users');
var Poll = require('../models/polls');

var path = process.cwd();
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

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
		
	app.route('/poll')
		.post(isLoggedIn, function (req, res) {
			console.log(req.body);
			var newpoll = {question : req.body.question};
			newpoll.choices = {};
			var choices = req.body.choices.split(',');
			choices.forEach(function(item) {
				newpoll.choices[item]=0;
			})
			newpoll.creator = req.user._id;
			console.log(newpoll);
			Poll.create(newpoll, function(err, poll) {
				if (err) {
					console.log(err);
				}
			User.findById(req.user._id, function(err, user){
				console.log(user);
				user.polls.push(poll._id);
    			user.save();
				res.redirect('/poll/' + poll._id);
			});
			});
		});

	app.route('/poll/:id/addchoices')
		.post(function (req, res) {
			var newchoices = {};
			var choices = req.body.choices.split(',');
			choices.forEach(function(item) {
				newchoices[item]=0;
			});
			Poll.findById(req.params.id, function(err, poll) {
			var idquery= { _id: req.params.id };
			newchoices = Object.assign(poll.choices, newchoices);
			console.log(newchoices);
			poll.update({ choices: newchoices });
			poll.markModified('choices');
			poll.save();
				res.redirect('/poll/' + poll._id);
});
		});
		
	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render("profile",{user:req.user});
		});
		
	app.route('/poll/:id')
		.get(function (req, res) {
			Poll.findById(req.params.id, function(err, poll){
				console.log(poll.choices);
				var labelarray = Object.keys(poll.choices);
				var valuearray = Object.keys(poll.choices).map(function(key) {
    			return poll.choices[key];
});
				console.log(labelarray);
				console.log(valuearray);
				res.render("poll",{
					poll:poll,
					labels:labelarray,
					values:valuearray
					
				});	
			})
		})
		.delete(function (req, res) {
			console.log(req.params);
			Poll.findOne({"_id":req.params.id}, function(err, poll){
				console.log(poll);
				if (poll) {
					poll.remove();
				};
			User.findById(req.user._id, function(err, user){
				console.log(user);
				var index = user.polls.indexOf(req.params.id);
				console.log(index);
				if (index > -1) {
    				user.polls.splice(index, 1);
    				user.save();
				}
				res.redirect('/profile');
			})	
			})
		})
		.post(function (req, res) {
			console.log(req.body);
			if (req.body.choice) {
				Poll.findOne({"_id": req.params.id}, function(err, poll) {
					poll.choices[req.body.choice]++;
					console.log(poll);
					poll.markModified('choices');
					poll.save();
					res.redirect('/poll/' + poll._id);
				})
			}
		});
		
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));	

	app.route('/success')
		.get(function (req, res) {
		res.render('success');
		});

};
