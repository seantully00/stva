'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var POll = require('../models/polls');

var User = new Schema({
   twitter: {
        id: String,
        username: String,
        displayName: String,
   },
   polls: [{type: Schema.Types.ObjectId, ref: 'Poll'}]
});

module.exports = mongoose.model('User', User);
