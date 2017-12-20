import React from 'react';
import {dateToString} from './controllers/Helper'

const PoolItem = ({payAmount, avgHashRate, estPay, hashRate, usdPerMin, _id, updTime, time, coin}) => {
    return  <div className="item eight wide computer sixteen wide tablet column">
                <div className="content">
                    <div className="ui segments">
                        <div className="ui segment">

                            <h2 className="ui large header">{ _id.address }</h2>
                            <div className="meta">{ _id.pool }</div>

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

                            <div className="ui grid centered mini statistics">
                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin*60*24).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        USD per day
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin*60*24*30).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        USD per month
                                    </div>

                                </div>

                                <div className="statistic">

                                    <div className="value">
                                        { (usdPerMin*60*24*365).toFixed(2) }
                                    </div>

                                    <div className="label">
                                        USD per year
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
