'use strict';

var Poll = require('../models/polls.js');
var User = require('../models/users.js');
var choicearray2 = [];
var choicearray = [];


function PollHandler () {


	this.addPoll = function (req, res) {
		process.nextTick(function (err, poll) {
				if (err) {
					return err;
				} else {
					var newPoll = new Poll();

					newPoll.poll.question = req.body.question;
					newPoll.poll.creator.id  = req.user._id;
					newPoll.poll.creator.username  = req.user.twitter.username;
					choicearray = req.body.choices.split(",");
					for (var i=0; i<choicearray.length; i++) {
							var newchoice = {choice: choicearray[i], count: 0};
							choicearray2.push(newchoice);
					}
					newPoll.poll.choices = choicearray2;
					

					newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						User.findOne({ polls: newPoll.poll.question })
							.populate('creator', 'displayName') // only return the Persons name
							.exec(function (err, poll) {
							if (err) {
								throw err;
							}
								});	
								
						User.findByIdAndUpdate(
    					req.user._id,
    					{$push: {polls: newPoll._id}},
    					{safe: true, upsert: true},
    					function(err, model) {
        					console.log(err);
    					}
					);			
						choicearray2 = [];
						choicearray = [];
						return newPoll;
						

					});
}
});
};
}

module.exports = PollHandler;