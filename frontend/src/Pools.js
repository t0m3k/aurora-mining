import * as Flypool from './controllers/Flypool';

export async function getFlypool(address) {
    let statsPromise = Flypool.get(address, "currentStats");
    let configPromise = Flypool.get(address, "settings");
    let historyPromise = Flypool.get(address, "history");
    return Promise.all([statsPromise, configPromise, historyPromise])
    .then(results => {
        let stats = results[0];
        let config = results[1];
        let history = results[2].map(item => ({
            hashRate: item.currentHashrate,
            avgHashRate: item.averageHashrate,
            time: item.time
        }));

        let unpaid = stats.unpaid / 100000000,
            time = stats.time,
            cpm = stats.coinsPerMin,
            pay = config.minPayout / 100000000;

        let toEarn = pay - unpaid;

        let waitTime = ((toEarn / cpm) * 60);

        let estPayTime = Math.round(time + waitTime);
        
        return {
            workers: stats.activeWorkers,
            avgHashRate: stats.averageHashrate,
            coinsPerMin: stats.coinsPerMin,
            usdPerMin: stats.usdPerMin,
            unpaid: unpaid,
            HashRate: stats.currentHashrate,
            estPay: estPayTime,
            time: stats.time,
            lastSeen: stats.lastSeen,
            history: history
        };
    });
}