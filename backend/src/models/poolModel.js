var mongoose = require('mongoose');

var PoolSchema = mongoose.Schema({
    _id: String,
    pool: String,
    workers: Number,
    avgHashRate: String,
    coinsPerMin: String,
    usdPerMin: String,
    unpaid: String,
    hashRate: String,
    estPay: String,
    time: Date,
    lastSeen: Date,
    history: [{
        hashRate: String,
        avgHashRate: String,
        time: Date
    }]
});

module.exports = mongoose.model("Pool", PoolSchema);