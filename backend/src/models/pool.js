var mongoose = require('mongoose');

var PoolSchema = mongoose.Schema({
    _id: {
        address: {
            type: String,
            required: true
        },
        pool: {
            type: String,
            required: true
        }
    },
    coin: String,
    workers: Number,
    avgHashRate: String,
    coinsPerMin: String,
    usdPerMin: String,
    unpaid: String,
    hashRate: String,
    estPay: String,
    payAmount: String,
    time: Date,
    updTime: {
        type: Date
    },
    lastSeen: Date,
    history: [{
        hashRate: String,
        avgHashRate: String,
        time: Date
    }]
});

module.exports = mongoose.model("Pool", PoolSchema);