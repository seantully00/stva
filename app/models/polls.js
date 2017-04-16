'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');

var Poll = new Schema({
	    question: String,
        creator: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        choices :  [{}]
});

module.exports = mongoose.model('Poll', Poll);
