var User                    = require('../models/user'),
    passport                = require('passport'),
    message                 = require('../middleware').message;

exports.createUser = (req, res) => {
    if(req.body.username && req.body.password){
        User.register(new User({
            username: req.body.username,
            isAdmin: false
            }),
            req.body.password,
            function(err, user){
                if(err || !user) {
                    if(err.code === 11000 || err.name == "UserExistsError"){
                        console.log(err);
                        res.status(409).json({loggedIn: false, message: "User with this name already exists."})
                    } else {
                        res.status(500).json({loggedIn: false, message: "Uknown error"})
                    }
                } else {
                    passport.authenticate("local")(req, res, function(){
                        return res.json({username: user.username});
                    });
                }
            }
        );
    }
    else {
        message(req, res, "Missing field!");
    }
}

exports.authUser = (req, res) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return message(req, res, err); }
        if (!user) { return res.status(401).json({loggedIn: false, message: "Wrong username or password"}) }
        req.logIn(user, function(err) {
          if (err) { return message(req, res, err); }
          return message(req, res, "Logged in!");
        });
      })(req, res);
};

exports.logOut = (req, res) => {
    req.logout();
    message(req, res, "Logged out!");
};

exports.getUserData = (req, res) => {
    if(req.user) {
        User.findOne({username: req.user.username})
        .then(user => res.json({user: user, loggedIn: req.isAuthenticated()}))
    } else {
        res.json({loggedIn: false})
    }
}

exports.addPool = (req, res) => {
    if(!req.user || (req.user.username !== req.params.username)) {
        return message(req, res, "You can't do that!");
    }

    User.findOne({username: req.user.username})
    .then(user => {
        user.pools.push(req.body);
        User.findByIdAndUpdate(user._id, user, {new: true})
        .then((updated) => res.json(updated))
        .catch((err) => message(req, res, err.message))
    })
}

module.exports = exports;
