import * as Flypool from './controllers/Flypool';

export async function getFlypool(address) {

    // create promises for getting all relevant data
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
            time: new Date(item.time * 1000)
        }));


        // calculating estemated next pay time
        let unpaid = stats.unpaid / 100000000, // amount earned so fat
            time = stats.time,
            cpm = stats.coinsPerMin,
            pay = config.minPayout / 100000000; // threshold after whitch payment will be released

        let toEarn = pay - unpaid; // amount tha need to be earned

        let waitTime = ((toEarn / cpm) * 60); // seconds 

        let estPayTime = Math.round(time + waitTime);
        

        // return all data
        return {
            _id: address,
            pool: "Flypool",
            workers: stats.activeWorkers,
            avgHashRate: stats.averageHashrate,
            coinsPerMin: stats.coinsPerMin,
            usdPerMin: stats.usdPerMin,
            unpaid: unpaid,
            hashRate: stats.currentHashrate,
            estPay: new Date(estPayTime * 1000),
            time: new Date(stats.time * 1000),
            lastSeen: new Date(stats.lastSeen * 1000),
            history: history
        };
    });
}