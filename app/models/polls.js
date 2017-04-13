'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');

var Poll = new Schema({
	poll: {
		//id: String,
		question: String,
        creator: {
            id: String,
            username: String
        },
        choices : [ ]
	}
});

module.exports = mongoose.model('Poll', Poll);
