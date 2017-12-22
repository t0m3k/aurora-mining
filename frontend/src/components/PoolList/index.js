import React, {Component} from 'react';
import PoolItem from './PoolItem';
import pools from '../../controllers/pools';
import {timeCounter} from '../../controllers/helper';
import './index.css';


class PoolList extends Component {
    constructor(props){
      super(props);
      this.state = {
        user:{
            pools: [
                {
                    _id: {
                        pool: "flypool",
                        address: "t1brFCzBzEBt11pSXRB5KXAzWkrs5HYZryB"
                    },
                    name: "My rig, 2 x 1070 + 5820k",
                    index: 0
                },
                {
                    _id: {
                        pool: "flypool",
                        address: "t1Yn1q9PuzxyZGKU898STebgCjVPCA8iHmZ"
                    },
                    name: "3",
                    index: 2
                },
                {
                    _id: {
                        pool: "poolGold",
                        address: "Gce7qwwvo16KsZPmVn6AUpn5BoHArDmNe5"
                    },
                    name: "1",
                    index: 1
                },
                {
                    _id: {
                        pool: "flypool",
                        address: "t1NTQbJELj3nzURB3tVJFM5bbL54FbEKULr"
                    },
                    name: "4",
                    index: 3                   
                }
            ],
            currency: "GBP"
        },
        pools:[],
        currency: {
            name: "USD",
            rate: 1
        }
      }

      this.addPool = this.addPool.bind(this);
      this.refreshPool = this.refreshPool.bind(this);
    }

    componentDidMount(){
        this.getCurrency();
        this.showPoolsFrames();
        this.loadPools();
    }

    // will load pool info from user and display frames for them
    showPoolsFrames(){
        return this.setState((prevState) => ({...prevState, pools:[...prevState.user.pools]}));
    }
    
    // will load pools data from cache
    loadPools(){
        this.state.user.pools.map(pool => {
            return pools.get[pool._id.pool](pool._id.address)
            .then(loaded => this.addPool({...loaded, name: pool.name, index: pool.index}));
        })
    }

    getCurrency(){
        fetch("https://api.fixer.io/latest?base=USD")
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
            resp.json()
            .then(resp => {
                if(resp.rates){
                    if(resp.rates[this.state.user.currency]){
                        this.setState((prevState) => (
                            {
                                ...prevState, 
                                currency: {
                                    name: this.state.user.currency, 
                                    rate: resp.rates[this.state.user.currency]
                                }
                            })
                        )
                    }
                }
            })
        })
    }
      
    refreshPool(pool){
        return pools.fresh[pool._id.pool](pool._id.address)
            .then(loaded => {

                console.log("Refreshed pool: " + pool.name)

                return this.addPool({...loaded, name: pool.name, index: pool.index}, false)
            });
    }

    // r - if true check if pool needs to be refreshed and refresh 
    addPool(pool, r = true){

        console.log("Adding pool: " + pool.name, pool.index)

        var pools = this.state.pools.filter(item => {
            return !((item._id.address === pool._id.address) && (item._id.pool === pool._id.pool))
        });

        if(r && pool.updTime && timeCounter(pool.updTime, 10)){

            console.log("Need to refresh pool: " + pool.name)

            this.refreshPool(pool);
        }

        return this.setState((prevState) => ({...prevState, pools:[...pools, pool]}));
    }

    render(){
        const pools = this.state.pools.map((pool) => (
          <PoolItem
            key = {pool._id.address}
            {...pool}
            currency = {this.state.currency.name}
            rate = {this.state.currency.rate}
          />
          ));
          pools.sort((a, b) => a.props.index - b.props.index)
          console.log(pools);
        return ( 
        <div className="ui container">
            <div className="ui grid stackable">
                    {pools}
            </div>
        </div>
        )
    }
}

export default PoolList;