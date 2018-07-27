var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImgSchema = new Schema({
	img: { type: String, required: true },
	user: {	type: String, required: true }
});

// Export model
module.exports = mongoose.model('Image', ImgSchema);
