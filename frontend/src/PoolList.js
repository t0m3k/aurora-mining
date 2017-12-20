import React, {Component} from 'react';
import PoolItem from './PoolItem';
import * as Pools from './Pools';

class PoolList extends Component {
    constructor(props){
      super(props);
      this.state = {
        pools: []
      }
    }

    componentWillMount(){
        this.loadPools();
    }
      
    async loadPools(){
        let flypool = await Pools.getFlypool("t1brFCzBzEBt11pSXRB5KXAzWkrs5HYZryB");
        this.setState({pools: [flypool, flypool]});
    }

    render(){
        const pools = this.state.pools.map((t) => (
          <PoolItem
            key={t._id}
            {...t}
          />
          ));
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