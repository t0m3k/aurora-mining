var express                 = require('express'),
    User                    = require('../models/user'),
    usersControllers        = require('../controllers/users'),
    middleware              = require("../middleware");

var router = express.Router({mergeParams: true});

router.route("/register")
.post(usersControllers.createUser);

router.route("/login")
.post(usersControllers.authUser);

router.route("/logout")
.get(usersControllers.logOut);

router.route("/u/:username")
.post(usersControllers.addPool)

router.route("/u/:username/:pool/:address")
.delete(usersControllers.deletePool)

router.route("/")
.get(usersControllers.getUserData);


module.exports = router;
