const   User        = require('../models/user'),
        Pool        = require('../models/pool'),
        message     = require('../middleware').message,
        jwt         = require('jsonwebtoken'),
        SECRET      = require('../../local_conf.js').SECRET

exports.createUser = (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        currency: req.body.currency,
        email: req.body.email,
        isAdmin: false
        })
        .then((user) => {
            const token = jwt.sign({_id: user.id}, SECRET)
            res.status(200).json({
                _id: user.id,
                username: user.username,
                loggedIn: true,
                token
            })
        }
    )
    .catch(err => {
        if(err.code === 11000 || err.name == "UserExistsError"){
            res.status(409).json({loggedIn: false, message: "User with this name already exists."})
        } else {
            res.status(500).json({loggedIn: false, message: "Uknown error"})
        }

    })
}

exports.authUser = (req, res) => {
    User.findOne({username: req.body.username}).select('+password')
    .then(user => {
        if(!user) {
            return res.status(400).json({message: 'Invalid Username/Password', loggedIn: false})
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch){
                const token = jwt.sign({_id: user.id}, SECRET)
                res.status(200).json({
                    _id: user.id,
                    username: user.username,
                    loggedIn: true,
                    token
                })
            } else {
                res.status(400).json({message: 'Invalid Username/Password', loggedIn: false})
            }
        })
    })
}

exports.getUserData = (req, res) => {
    return User.findById(req.userId).lean()
    .then(user => {
        if(!user) {
            return res.status(400).json({message: 'Please log in first', loggedIn: false})
        }

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
            res.json({user: {...user, pools: resultPools}, loggedIn: true})
        })
    })
    .catch(err => res.status(401))
}

exports.addPool = (req, res) => {
    return User.findById(req.params.id)
    .then(user => {
        if(user.pools.some(p => ((p.address === req.body.address) && (p.pool === req.body.pool)))){
            return res.status(409).json({message: 'This address on this pool already exists!'})
        }
        user.pools.push({
                address: req.body.address, 
                pool: req.body.pool,
                name: req.body.name
            })
        return user.save()
        .then((updated) => exports.getUserData(req, res))
    })
    .catch((err) => message(req, res, err.message))
}

exports.updateUser = (req, res) => {
    return User.findById(req.userId)
    .then(user => {
        user.currency = req.body.currency || user.currency
        return user.save()
        .then((updated) => exports.getUserData(req, res))
    })
    .catch((err) => message(req, res, err.message))
}

exports.deletePool = (req, res) => {
    User.update({_id: req.params.id}, {$pull: {pools: {pool: req.params.pool, address: req.params.address}}})
    .then((user) => {
        console.log(user)
        exports.getUserData(req, res)
    })
    .catch((err) => message(req, res, err.message))
}

module.exports = exports;
