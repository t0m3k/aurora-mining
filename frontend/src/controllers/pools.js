import * as flypool from './flypool';
import * as poolGold from './poolGold';

var Pools = {};
Pools.get = {};
Pools.fresh = {};

Pools.get.flypool = function(address) {
    return flypool.get(address);
}

Pools.get.poolGold = function(address) {
    return poolGold.get(address);
}

Pools.fresh.flypool = function(address) {
    return flypool.getFresh(address);
}

Pools.fresh.poolGold = function(address) {
    return poolGold.getFresh(address);
}

export default Pools;
