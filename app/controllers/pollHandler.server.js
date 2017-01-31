'use strict';

var Poll = require('../models/polls.js');
var id = 1;

function PollHandler () {

	this.getPolls = function (req, res) {
		Poll
			.findOne({ 'poll.id': req.poll.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};

	this.addPoll = function (req, res) {
		Poll.findOne({ 'poll.id': req.poll.id }, function (err, poll) {
				if (err) {
					return err;
				}
				if (poll) {
					return poll;
				} else {
					var newPoll = new Poll();

					newPoll.poll.id = id;
					newPoll.poll.question = req.poll.question;
					newPoll.poll.creator  = req.poll.creator;
					newPoll.poll.choices  = req.poll.choices;

					newPoll.save(function (err) {
						if (err) {
							throw err;
						}
						id = id++;
						return newPoll;
					});
				}
			});
	};

}

module.exports = PollHandler;
