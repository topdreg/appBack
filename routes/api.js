var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/apiController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/:resource", api_controller.resource_get);

router.post('/signup', api_controller.signup_post);

router.post('/login', api_controller.login_post);

router.post("/users/:id/photo", api_controller.image_post);

module.exports = router;
