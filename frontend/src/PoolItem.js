import React from 'react';

const PoolItem = ({pool, avgHashRate, estPay, hashRate, usdPerMin, _id}) => {
    let estDate = new Date(estPay);
    let stringEst = `${ estDate.toLocaleTimeString() } ${ estDate.toLocaleDateString() }`;
    return  <div className="item">
                <div className="content">
                    <div className="ui segments">
                        <div className="ui segment">
                            <h2 className="ui header">{ pool }</h2>
                            <div class="meta">{ _id }</div>
                        </div>
                        <div className="ui segment">
                                <div className="ui tiny statistic">
                                    <div className="value">
                                        { Math.round(hashRate) } H/s
                                    </div>
                                    <div className="label">
                                        Current
                                    </div>
                                </div>
                                <div className="ui tiny statistic">
                                    <div className="value">
                                        { Math.round(avgHashRate) } H/s
                                    </div>
                                    <div className="label">
                                        Average
                                    </div>
                                </div>
                        </div>
                        <div className="ui segment">
                            <div>
                                <div className="ui tiny statistic">
                                    <div className="value">
                                        { (usdPerMin*60*24).toFixed(2) }
                                    </div>
                                    <div className="label">
                                        USD per day
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui segment">
                            <div>
                                <div className="ui tiny statistic">
                                    <div className="value">
                                        { stringEst }
                                    </div>
                                    <div className="label">
                                        Est. pay time
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
};

export default PoolItem;