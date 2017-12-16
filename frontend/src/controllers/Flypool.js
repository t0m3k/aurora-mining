export async function get(address, type) {
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