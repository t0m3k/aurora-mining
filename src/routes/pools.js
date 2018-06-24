var express = require('express'),
    pools = require('../controllers/pools')

var router = express.Router({ mergeParams: true })

router.route('/:pool/:address')
    .get(pools.getMinerStats)


router.route('/:pool/')
    .post(pools.addMinerStats)

module.exports = router
