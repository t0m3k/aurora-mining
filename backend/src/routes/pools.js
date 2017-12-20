var express                 = require('express'),
    User                    = require('../models/user'),
    pools                   = require('../controllers/pools')
    middleware              = require('../middleware');

var router = express.Router({mergeParams: true});

// all users

router.route("/:pool/:address")
.get(pools.getMinerStats);


router.route("/:pool/")
.post(pools.addMinerStats);

module.exports = router;
