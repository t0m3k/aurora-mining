var Pool                   = require('../models/poolModel'),
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
    
    Pool.create(req.body)
    .then(stats => res.json(stats))
    .catch(err => {
        if(err.code === 11000) {
            let data = {...req.body, _id: null};
            delete data._id;
            Pool.findByIdAndUpdate(req.body._id, data, {new: true})
            .then(stats => {
                console.log(stats);
                res.json(stats)
            })
            .catch(err => message(req, res, err))
        }
        else {
            message(req, res, err)
        }
    });
}

module.exports = exports;
