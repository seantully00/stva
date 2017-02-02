'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	poll: {
		//id: String,
		question: String,
        creator: String,
        choices : [{
            choice : String,
            count : Number
        }]
	}
});

module.exports = mongoose.model('Poll', Poll);
