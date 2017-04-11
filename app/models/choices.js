'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users');
var Poll = require('../models/polls');

var Choice = new Schema({
	choices : [{
            choice : String,
                count : Number
        }]
});

module.exports = mongoose.model('Choice', Choice);
