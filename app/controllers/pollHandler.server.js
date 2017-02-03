'use strict';

var Poll = require('../models/polls.js');
var User = require('../models/users');

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
					newPoll.poll.creator  = User._id;
					newPoll.poll.choices.push(req.body.choices);
					User.polls = req.body.question;
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
