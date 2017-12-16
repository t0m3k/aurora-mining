import React, {Component} from 'react';
import * as Pools from './PoolsController';

class PoolList extends Component {

    componentWillMount(){
        this.loadPools();
    }
      
    async loadPools(){
        let pools = await Pools.getFlypool("t1brFCzBzEBt11pSXRB5KXAzWkrs5HYZryB");
        console.log(pools);
        this.setState({pools});
    }

    render(){
        return (
            <h1>Pool List!</h1>
        )
    }
}

export default PoolList;