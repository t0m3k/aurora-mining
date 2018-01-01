var mongoose = require('mongoose');

var PoolSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    pool: {
        type: String,
        required: true
    },
    coin: String,
    workers: {
        type: Number,
        default: 0
    },
    avgHashRate: {
        type: String,
        default: '0'
    },
    coinsPerDay: {
        type: String,
        default: '0'
    },
    usdPerDay: {
        type: String,
        default: '0'
    },
    unpaid: {
        type: String,
        default: '0'
    },
    hashRate: {
        type: String,
        default: '0'
    },
    estPay: {
        type: String,
        default: '0'
    },
    payAmount: {
        type: String,
        default: '0'
    },
    time: {
        type: Date,
        default: new Date(0)
    },
    updTime: {
        type: Date,
        default: new Date()
    },
    lastSeen: {
        type: Date,
        default: new Date(0)
    },
    history: [{
        hashRate: String,
        avgHashRate: String,
        time: Date
    }]
});

PoolSchema.statics.findOneOrCreate = function(item, cb){
    return (item ? this.findOne(item, cb):this.findOne({}, cb))
    .then(page=>page ? page : this.create(item, cb))
  }

module.exports = mongoose.model("Pool", PoolSchema);