'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');

var Poll = new Schema({
	poll: {
		//id: String,
		question: String,
        creator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        choices : [{
            choice : String,
            count : Number
        }]
	}
});

module.exports = mongoose.model('Poll', Poll);
