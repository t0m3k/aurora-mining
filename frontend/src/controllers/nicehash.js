import * as helper from './Helper'
import axios from 'axios'

function btcApi() { // fetch data from flypool api
  return axios(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`)
}

export function getFresh(address) {
  const now = Math.floor(Date.now() / 1000)

  // create promises for getting all relevant data
  const statsPromise = axios(`https://cors-anywhere.herokuapp.com/https://api.nicehash.com/api?method=stats.provider&addr=${ address }`)
  const exPromise = axios(`https://cors-anywhere.herokuapp.com/https://api.nicehash.com/api?method=stats.provider.ex&addr=${ address }&from=${ now-30 }`)
  const btcPromise = btcApi()

  return Promise.all([statsPromise, exPromise, btcPromise])
  .then(results => {
    console.log(results)
    let stats = results[0].data.result
    let history = results[1].data.result
    let btcToUsd = results[2].data.USD

    console.log(stats, history)

    if(stats.error || history.error){
      const err = {message: "Api limit exceeded"}
      throw err
    }
    
    const coinsPerDay = history.current.reduce((p, c) => {
      const a = parseFloat(c.data[0].a)
      if(!a){
        return p
      }
      const prof = parseFloat(c.profitability) * a
      return (p + prof)
    }, 0)
    const unpaid = stats.stats.reduce((p, c) => (p + parseFloat(c.balance)), 0)
    const usdPerDay = (btcToUsd * coinsPerDay).toFixed(2)


    // calculating estemated next pay time
    let time = new Date(),
        pay = history.nh_wallet ? 0.001 : 0.01

    let toEarn = pay - unpaid // amount tha need to be earned

    let waitTime = Math.round((toEarn / coinsPerDay) * 86400000) // milliseconds 

    let estPayTime = Math.round(time.getTime() + waitTime)
    
    // return all data
    stats = {
        address: address,
        pool: "nicehash",
        coin: "BTC",
        workers: stats.activeWorkers,
        avgHashRate: stats.averageHashrate,
        coinsPerDay,
        usdPerDay,
        unpaid,
        hashRate: stats.currentHashrate,
        estPay: new Date(estPayTime),
        payAmount: pay,
        time: new Date(),
        updTime: new Date(),
        lastSeen: new Date(),
        history: []
    }

    helper.saveLocal(stats)

    return stats
  })
}
