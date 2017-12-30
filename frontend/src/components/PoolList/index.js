import React, {Component} from 'react';
import PoolItem from './PoolItem';
import { connect } from 'react-redux';
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'

class PoolList extends Component {
    componentWillMount(){
        
    }

    render(){
        let pools = []


        if(this.props.user.pools){
            pools = this.props.user.pools.map((pool) => (
                <PoolItem
                    key = {pool._id.address}
                    {...pool}
                    currency = {this.props.currency.name}
                    rate = {this.props.currency.rate}
                />
                ));
        }

        pools.sort((a, b) => a.props.index - b.props.index)

        return (
        <div className="ui container">
            <div className="ui grid stackable">
                    {pools}
            </div>
            <Button fab color="primary" aria-label="add" style={{position:"fixed", right:'1em', bottom:'1em'}}>
                <AddIcon />
            </Button>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        currency: state.currency
    }
}

export default connect(mapStateToProps)(PoolList);
