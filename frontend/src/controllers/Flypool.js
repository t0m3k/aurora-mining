import * as helper from './Helper';

function apiCall(address, type) { // fetch data from flypool api
  return fetch(`https://api-zcash.flypool.org/miner/${ address }/${ type }`)
  .then(resp => {
    if(!resp.ok) {
      if(resp.status >=400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = {errorMessage: data.message};
          throw err;
        })
      } else {
        let err = {errorMessage: 'Please try again later, server is not responding'};
        throw err;
      }
    }
    return resp.json()
    .then(input => {
      if(input.status !== "OK") {
          let err = {errorMessage: "Please try again later, server did not return data"};
          throw err;
      }
      return input.data;
    });
  });
}

export function getFresh(address) {
  // create promises for getting all relevant data
  let statsPromise = apiCall(address, "currentStats")
  let configPromise = apiCall(address, "settings")
  let historyPromise = apiCall(address, "history")

  return Promise.all([statsPromise, configPromise, historyPromise])
  .then(results => {

      let stats = results[0]
      let config = results[1]
      let history = results[2].map(item => ({
          hashRate: item.currentHashrate,
          avgHashRate: item.averageHashrate,
          time: new Date(item.time * 1000)
      }))


      // calculating estemated next pay time
      let unpaid = stats.unpaid / 100000000, // amount earned so fat
          time = stats.time,
          cpm = stats.coinsPerMin,
          pay = config.minPayout / 100000000; // threshold after whitch payment will be released

      let toEarn = pay - unpaid // amount tha need to be earned

      let waitTime = ((toEarn / cpm) * 60); // seconds 

      let estPayTime = Math.round(time + waitTime);
      
      // return all data
      stats = {
          address: address,
          pool: "flypool",
          coin: "ZEC",
          workers: stats.activeWorkers,
          avgHashRate: stats.averageHashrate,
          coinsPerDay: stats.coinsPerMin * 60 * 24,
          usdPerDay: stats.usdPerMin * 60 * 24,
          unpaid: unpaid,
          hashRate: stats.currentHashrate,
          estPay: new Date(estPayTime * 1000),
          payAmount: pay,
          time: new Date(stats.time * 1000),
          updTime: new Date(),
          lastSeen: new Date(stats.lastSeen * 1000),
          history: history
      };     

      helper.saveLocal(stats);

      return stats;
  });
}

export function get(address) {
  return helper.getLocal('flypool', address)
  .then(stats => {
    if(!stats || stats.length === 0) {      
      return getFresh(address);
    }
    return stats;
  })
}