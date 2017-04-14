'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	/*github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   },*/
   twitter: {
        id: String,
        username: String,
        displayName: String,
   },
   polls: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('User', User);
