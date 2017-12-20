var express                 = require('express'),
    User                    = require('../models/user'),
    usersControllers        = require('../controllers/users'),
    middleware              = require("../middleware");

var router = express.Router({mergeParams: true});

router.route("/register")
.post(usersControllers.createUser);

router.route("/login")
.post(usersControllers.authUser);

router.route("/u/:username")
.post(usersControllers.addPool)

router.route("/")
.get(middleware.isLoggedIn, usersControllers.getUserData);


module.exports = router;
