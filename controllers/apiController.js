var fs = require('fs');
var sanitize = require('mongo-sanitize');
var User = require('../models/user');
var Image = require('../models/img');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.signup_post = function(req, res) {

	if (req.body.login.length < 6 || req.body.password.length < 6) {
			res.json({
				confirmation: "fail",
				message: "Username and password needs at least 6 characters."
			})
	}

	cleanName = sanitize(req.body.login);
	cleanPassword = sanitize(req.body.password);

	var user = new User(
		{
			username: cleanName,
			password: cleanPassword
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
		res.json({
			confirmation: "success"
		})
};

exports.login_post = function(req, res) {
	
	cleanName = sanitize(req.body.login);
	cleanPassword = sanitize(req.body.password);

	User.findOne({ 'username': cleanName })
		.exec( function(err, found_user) {
			if (err) { console.log("Error occurred!"); }

			if (found_user) {  
				if (cleanPassword === found_user.password) {
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
	const userId = req.params.id; var image = new Image;
	image.img = req.body.base64;
	image.user = userId;
	image.save();
	res.send({
		data: image
	})
};

