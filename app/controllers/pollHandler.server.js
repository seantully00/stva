'use strict';

var Poll = require('../models/polls.js');

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
		var id = 1;
		process.nextTick(function () {
			Poll.findOne({ 'poll.id': id }, function (err, poll) {
				if (err) {
					return err;
				}
				if (poll) {
					return poll;
				} else {
					var newPoll = new Poll();

					newPoll.poll.id = id;
					newPoll.poll.question = req.body.question;
					//newPoll.poll.creator  = twitter.username;
					newPoll.poll.choices.choice  = req.body.choices;
					//newPoll.poll.choices.count = 1;

					newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						//id = id++;
						return newPoll;
					});
				}
			});
	});
};
}

module.exports = PollHandler;
