import React from 'react';
import {dateToString} from '../../controllers/helper'

const PoolItem = ({
        payAmount,
        avgHashRate,
        estPay,
        hashRate,
        usdPerMin,
        _id,
        updTime,
        time, 
        coin,
        coinsPerMin,
        name,
        currency,
        rate
    }) => {
    return  <div className="item eight wide computer sixteen wide tablet column">
                <div className="content">
                    <div className="ui segments">
                        <div className="ui segment">
                            
                            <h2 className="ui medium header">{ name }</h2>
                            <div className="ui tiny header">{ _id.address }
                            <div className="meta">{ _id.pool }</div>
                            </div>

                        </div>
                        <div className="ui segment">

                            <p className="ui header">Hash Rate</p>

                            <div className="ui grid centered mini statistics">
                                <div className="statistic">

                                    <div className="value">
                                        { Math.round(hashRate) } H/s
                                    </div>

                                    <div className="label">
                                        Current
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { Math.round(avgHashRate) } H/s
                                    </div>

                                    <div className="label">
                                        Average
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="ui segment">

                            <p className="ui header">Earnings</p>

                            <p className="ui horizontal divider">{ currency }</p>

                            <div className="ui grid centered mini statistics">
                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin * 60 * 24 * rate).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        day
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin * 60 * 24 * 30 * rate).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        month
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin * 60 * 24 * 365 * rate).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        year
                                    </div>

                                </div>

                            </div>
                                
                            <p className="ui horizontal divider">{ coin }</p>
                                
                            <div className="ui grid centered mini statistics">
                                
                            
                                <div className="statistic">

                                    <div className="value">
                                        { (coinsPerMin*60*24).toFixed(4) }
                                    </div>

                                    <div className="label">
                                        day
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (coinsPerMin*60*24*30).toFixed(4) }
                                    </div>

                                    <div className="label">
                                        month
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (coinsPerMin*60*24*365).toFixed(4) }
                                    </div>

                                    <div className="label">
                                        year
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="ui segment">

                            <p className="ui header">Next pay</p>

                            <div className="ui grid centered mini statistics">
                                <div className="statistic">

                                    <div className="value">
                                        { dateToString(estPay) }
                                    </div>

                                    <div className="label">
                                        Est. pay time
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { payAmount }
                                    </div>

                                    <div className="label">
                                        { coin }
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="ui segment">

                        <p className="ui header">Updates</p>
                            <div className="ui grid centered mini statistics">

                                <div className="statistic">

                                    <div className="value">
                                        { dateToString(updTime) }
                                    </div>

                                    <div className="label">
                                        Last refresh
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { dateToString(time) }
                                    </div>

                                    <div className="label">
                                        Stats for
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

};

export default PoolItem;
