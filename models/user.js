var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: {type: String, max: 100},
	lastName: {type: String, max: 100},
	email: {type: String, max: 100},
	username: {type: String, max: 100},
	image: {type: String, max: 100},
	bio: {type: String, max: 100},
	password: {type: String, required: true, max: 100}
});

// Virtual for user's full name
UserSchema.
	virtual('name')
	.get(function () {
		return this.firstName + ', ' + this.lastName;
	});

// Export model
module.exports = mongoose.model('User', UserSchema);
