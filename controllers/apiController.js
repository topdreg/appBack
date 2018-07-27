var fs = require('fs');
var User = require('../models/user');
var Image = require('../models/img');

exports.resource_get = function(req, res) {
	const { resource } = req.params
	const { query } = req
	Image.find({ 'user': '5b4e7e857612a9436cfd21c4' }).
		then(data => {
			res.json({
				confirmation: "success",
				data: data
			})
			return;
		}).
		catch(err => {
			res.json({
				confirmation: "fail",
				message: "Something went wrong"
			})
			return;
		});
};

exports.image_post = function(req, res) {
	const userId = req.params.id;
	var image = new Image;
	image.img = req.body.base64;
	image.user = userId;
	image.save();
	res.send({
		data: image
	})
};

exports.signup_post = function(req, res) {
	var user = new User(
		{
			username: req.body.login,
			password: req.body.password
		}
	);
	User.findOne({ 'username': req.body.login })
		.exec( function(err, found_user) {
			if (err) { console.log("Error occurred!"); }

			if (found_user) { console.log("Username already taken."); }

			else {
				user.save();
			}
		})
	return;
};

exports.login_post = function(req, res) {
	User.findOne({ 'username': req.body.login })
		.exec( function(err, found_user) {
			if (err) { console.log("Error occurred!"); }

			if (found_user) {  
				if (req.body.password === found_user.password) {
					res.json({
						confirmation: 'success',
						data: found_user
					})
				}
				else {
					res.json({
						confirmation: 'fail'
					})
				}
			}

			else {
				console.log("Username is not in the system - please register");
			}
		})
	return;
};
