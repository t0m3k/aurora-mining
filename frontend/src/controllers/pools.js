import * as flypool from './flypool'
import * as poolGold from './poolGold'
import * as nicehash from './nicehash'

var Pools = {}
Pools.getFresh = {}

Pools.getFresh.flypool = function(address) {
    return flypool.getFresh(address)
}

Pools.getFresh.nicehash = function(address) {
    return nicehash.getFresh(address)
}

Pools.getFresh.poolGold = function(address) {
    return poolGold.getFresh(address)
}

export default Pools;
