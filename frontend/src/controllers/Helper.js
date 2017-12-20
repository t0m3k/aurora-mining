export async function saveLocal(stats) { // save data to local api
    fetch(`/pools/${stats.pool}/`, {
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
  
export async function getLocal(pool, address) { // fetch data from local api
    return fetch(`/pools/${pool}/${address}`)
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
    return `${ d.toLocaleTimeString() } ${ d.toLocaleDateString() }`;
}
