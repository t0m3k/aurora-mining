var User                    = require('../models/user'),
    passport                = require('passport'),
    message                 = require('../middleware').message;

exports.createUser = (req, res) => {
    if(req.body.username && req.body.email && req.body.password){
        User.register(new User({
            username: req.body.username,
            email: req.body.email,
            isAdmin: false
            }),
            req.body.password,
            function(err, user){
                if(err || !user) {
                    return message(req, res, err.message);
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
        if (!user) { return message(req, res, "Could not login"); }
        req.logIn(user, function(err) {
          if (err) { return message(req, res, err); }
          return res.json({username: user.username});
        });
      })(req, res);    
};

exports.getUserData = (req, res) => {
    res.json({user: req.user, loggedIn: req.isAuthenticated()});
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
