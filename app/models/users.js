'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   },
   twitter: {
        id: String,
        screen_name: String,
        name: String
   }
});

module.exports = mongoose.model('User', User);
