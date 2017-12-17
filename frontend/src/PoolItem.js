import React from 'react';

const PoolItem = ({payAmount, avgHashRate, estPay, hashRate, usdPerMin, _id, updTime}) => {
    let estDate = new Date(estPay);
    let date = new Date(updTime);
    let stringEst = `${ estDate.toLocaleTimeString() } ${ estDate.toLocaleDateString() }`;
    let stringUpdate = `${ date.toLocaleTimeString() } ${ date.toLocaleDateString() }`;
    return  <div className="item">
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
                            </div></div>
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
                                        { stringEst }
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
                                        Pay amount
                                    </div>
                                </div>
                                <div className="statistic">
                                    <div className="value">
                                        { stringUpdate }
                                    </div>
                                    <div className="label">
                                        Last update
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export default PoolItem;