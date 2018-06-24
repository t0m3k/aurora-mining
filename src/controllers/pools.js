var Pool = require('../models/pool'),
    message = require('../middleware').message


exports.getMinerStats = (req, res) => {
    Pool.findOne({
        address: req.params.address,
        pool: req.params.pool
    })
        .then(stats => {
            res.json(stats)
        })
        .catch(err => message(req, res, err))
}

exports.addMinerStats = (req, res) => {
    Pool.update({ address: req.body.address, pool: req.body.pool }, req.body, { upsert: true, setDefaultsOnInsert: true })
        .then(stats => {
            res.json(stats)
        })
        .catch(err => message(req, res, err.message))
}

module.exports = exports
