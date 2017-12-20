var Pool                   = require('../models/pool'),
    message                 = require('../middleware').message;


exports.getMinerStats = (req, res) => {
    Pool.find({
        _id: {
            address: req.params.address, 
            pool: req.params.pool
        }
    })
    .then(stats => {
        res.json(stats);
    })
    .catch(err => message(req, res, err));
}

exports.addMinerStats = (req, res) => {
    Pool.findById(req.body._id)
    .then(pool => {
        
        if(!pool) {
            Pool.create(req.body)
            .then(newPool => res.json(newPool))
            .catch(err => message(req, res, err.message));
        }
        
        let data = {...req.body, _id: null};
        delete data._id;

        Pool.findByIdAndUpdate(req.body._id, data, {new: true})
        .then(stats => {
            console.log(stats);
            res.json(stats)
        })
        .catch(err => message(req, res, err))

    })
    .catch(err => message(req, res, err.message));
}

module.exports = exports;
