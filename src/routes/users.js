var express = require('express'),
    usersControllers = require('../controllers/users'),
    middleware = require('../middleware')

var router = express.Router({ mergeParams: true })

router.route('/register')
    .post(usersControllers.createUser)

router.route('/login')
    .post(usersControllers.authUser)

router.route('/u/:id')
    .post(middleware.correctUser, usersControllers.addPool)
    .put(middleware.correctUser, usersControllers.updateUser)

router.route('/u/:id/:pool/:address')
    .delete(middleware.correctUser, usersControllers.deletePool)

router.route('/')
    .get(middleware.isLoggedIn, usersControllers.getUserData)


module.exports = router
