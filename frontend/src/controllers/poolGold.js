import * as helper from './helper';

async function apiCall(address) { // fetch data from flypool api
    return fetch(`http://cors-anywhere.herokuapp.com/https://mine.pool.gold/api/worker_stats?${ address }`, {origin: 'some.web'})
    .then(resp => {
      if(!resp.ok) {
        if(resp.status >=400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else {
          console.log(resp);
          
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return resp.json();
   });
}

export async function getFresh(address) {
  // create promises for getting all relevant data
  return apiCall(address)
  .then(stats => {
    let sum = 0;
    let history = [];
    let avgHashRate = 0;
    let lastSeen = 0;

    if(Object.keys(stats.history).length > 0){
      history = stats.history[Object.keys(stats.history)[0]].map((item, i) => {
        sum += item.hashrate / 500000;
        return {
          hashRate: item.hashrate / 5000000,
          avgHashRate: sum / (i+1),
          time: new Date(item.time * 1000)
      }});

      avgHashRate = history[history.length-1].avgHashRate;
      lastSeen = history[history.length-1].time;
    }

    let cpd = Object.keys(stats.workers).reduce(function(accumulator, currentValue) {
      return accumulator + (1 / stats.workers[currentValue].luckDays);
    }, 0) * 12.5;

    console.log(cpd);
  
  

    // calculating estemated next pay time
    let unpaid = stats.balance, // amount earned so fat
        time = new Date().getTime(),
        cpm = cpd / 24 / 60,
        pay = 0.01; // threshold after whitch payment will be released

    let toEarn = pay - unpaid; // amount tha need to be earned

    console.log(time)

    let waitTime = ((toEarn / cpm) * 60 * 1000); // miliseconds 

    let estPayTime = Math.round(time + waitTime);

    console.log(estPayTime);
    
    
    // return all data
    stats = {
        _id: {
          address: address,
          pool: "poolGold"
        },
        coin: "BTG",
        workers: Object.keys(stats.workers).length,
        avgHashRate: avgHashRate,
        coinsPerMin: cpm,
        usdPerMin: cpm * 465,
        unpaid: unpaid,
        hashRate: stats.totalHash / 500000,
        estPay: new Date(estPayTime),
        payAmount: pay,
        time: new Date(),
        updTime: new Date(),
        lastSeen: new Date(lastSeen),
        history: history
    };     

    helper.saveLocal(stats);

    return stats;
  });
}

export async function get(address) {
  return helper.getLocal('poolGold', address)
  .then(stats => {
    if(!stats || stats.length === 0) {      
      return getFresh(address);
    }
    return stats;
  })
}