import React, {Component} from 'react';

class PoolList extends Component {
    render(){
        return (
            <div className="ui menu">
                <div className="header item">
                    Aurora Mining
                </div>
                <a className="item">
                    About Us
                </a>
                <a className="item">
                    Jobs
                </a>
                <a className="item">
                    Locations
                </a>
            </div>
        )
    }
}

export default PoolList;