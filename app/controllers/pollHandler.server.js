'use strict';

var Poll = require('../models/polls.js');
var User = require('../models/users.js');
var choicearray2 = [];


function PollHandler () {


	/*this.getPolls = function (req, res) {
		Poll
			.findOne({ 'poll.id': id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};*/

	this.addPoll = function (req, res) {
		//var id = 1;
		process.nextTick(function (err, poll) {
				if (err) {
					return err;
				} else {
					var newPoll = new Poll();

					//newPoll.poll.id = id;
					newPoll.poll.question = req.body.question;
					//newPoll.poll.creator  = displayName;
					var choicearray = req.body.choices.split(",");
					for (var i=0; i<choicearray.length; i++) {
							var newchoice = {choice: choicearray[i], count: 0};
							choicearray2.push(newchoice);
					}
					newPoll.poll.choices = choicearray2;
					//User.polls = req.body.question;
					//newPoll.poll.choices.count = 1;
					//id++;
					
					newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						User.findOne({ polls: newPoll.poll.question })
							.populate('creator', 'displayName') // only return the Persons name
							.exec(function (err, story) {
							if (err) {
								throw err;
							}
								});	
						return newPoll;
					});
}
});
};
}

module.exports = PollHandler;
