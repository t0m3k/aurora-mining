var express                 = require('express'),
    User                    = require('../models/user'),
    usersControllers        = require('../controllers/users'),
    middleware              = require("../middleware");

var router = express.Router({mergeParams: true});

router.route("/register")
.post(usersControllers.createUser)

router.route("/login")
.post(usersControllers.authUser)

router.route("/u/:id")
.post(middleware.correctUser, usersControllers.addPool)
.put(middleware.correctUser, usersControllers.updateUser)

router.route(middleware.correctUser, "/u/:id/:pool/:address")
.delete(usersControllers.deletePool)

router.route("/")
.get(middleware.isLoggedIn, usersControllers.getUserData)


module.exports = router
