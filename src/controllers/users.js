var User                    = require('../models/user'),
    Pool                    = require('../models/pool'),
    passport                = require('passport'),
    message                 = require('../middleware').message;

exports.createUser = (req, res) => {
    if(req.body.username && req.body.password){
        User.register(new User({
            username: req.body.username,
            currency: req.body.currency,
            email: req.body.email,
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
        return User.findOne({username: req.user.username}).lean()
        .then(user => {
            let poolsPromise = []

            
            poolsPromise = user.pools.map((pool) => {
                return Pool.findOneOrCreate({
                        address: pool.address, 
                        pool: pool.pool
                })
            })

            return Promise.all(poolsPromise)
            .then((pools) => {
                let resultPools = pools.map(pool => {
                    const t = user.pools.find((p) => ((p.pool === pool.pool) && (p.address === pool.address)))

                    return {...pool.toObject(), name: t.name}
                })
                res.json({user: {...user, pools: resultPools}, loggedIn: req.isAuthenticated()})
            })
        })
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
        if(user.pools.some(p => ((p.address === req.body.address) && (p.pool === req.body.pool)))){
            return res.status(409).json({message: 'This address on this pool already exists!'})
        }
        user.pools.push({
                address:req.body.address, 
                pool: req.body.pool,
                name: req.body.name
            })
        return user.save()
        .then((updated) => exports.getUserData(req, res))
    })
    .catch((err) => message(req, res, err.message))
}

exports.deletePool = (req, res) => {
    if(!req.user || (req.user.username !== req.params.username)) {
        return message(req, res, "You can't do that!");
    }

    User.update({username: req.params.username}, {$pull: {pools: {pool: req.params.pool, address: req.params.address}}})
    .then(() => {
        exports.getUserData(req, res)
    })
    .catch((err) => message(req, res, err.message))
}

module.exports = exports;
