import axios from 'axios'

export function saveLocal(stats) { // save data to local api
    fetch(`/api/pools/${stats.pool}`, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
          }),
        body: JSON.stringify(stats)
    })
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
        return resp.json();
     })
}
  
export function getLocal(pool, address) { // fetch data from local api
    return fetch(`/api/pools/${pool}/${address}`)
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
      .then(stats => {
        return stats[0];
      });
   });
}

export function timeCounter(time = 0, minutes){
    let now = new Date();
    let old = new Date(time);
    let elapsed = now - old;    
    return (elapsed > (minutes * 60000));
}

export function dateToString(date){
    let d = new Date(date);
    let hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
    let minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return `${ hours + ':' + minutes } ${ d.getDate() + "/" + (d.getMonth() + 1) }`;
}


export async function getCurrency(currency){
    const USD = {
        name: 'USD', 
        rate: 1
    }

    if(currency === 'USD'){
        return USD
    }

    const result = axios("https://api.fixer.io/latest?base=USD")
    .then(resp => {
        if(resp.data.rates[currency]){
            return  {
                name: currency, 
                rate: resp.data.rates[currency]
            }
        } else {
            return USD
        }
    })
    return result
}
