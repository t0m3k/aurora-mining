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
        rate,
        unpaid
    }) => {
    

    // array of stat segments to be displayed
    const segments = [
        {
            header: "Hash rate",
            values: [
                {
                    value: Math.round(hashRate) + "H/s",
                    label: "Current"
                },
                {
                    value: Math.round(avgHashRate) + "H/s",
                    label: "Average"
                }
            ]
        },
        {
            header: "Earnings - " + currency,
            values: [
                {
                    value: (usdPerMin * 60 * 24 * rate).toFixed(2),
                    label: "day"
                },
                {
                    value: (usdPerMin * 60 * 24 * rate * 30).toFixed(2),
                    label: "month"
                },
                {
                    value: (usdPerMin * 60 * 24 * rate * 365).toFixed(2),
                    label: "year"
                }
            ]
        },
        {
            header: "Earnings - " + coin,
            values: [
                {
                    value: (coinsPerMin * 60 * 24).toFixed(4),
                    label: "day"
                },
                {
                    value: (coinsPerMin * 60 * 24 * 30).toFixed(4),
                    label: "month"
                },
                {
                    value: (coinsPerMin * 60 * 24 * 365).toFixed(4),
                    label: "year"
                }
            ]
        },
        {
            header: "Next Pay",
            values: [
                {
                    value: dateToString(estPay),
                    label: "Est. pay time"
                },
                {
                    value: payAmount,
                    label: coin
                },
                {
                    value: parseFloat(unpaid).toFixed(4),
                    label: "Unpaid"
                }
            ]
        },
        {
            header: "Updates",
            values: [
                {
                    value: dateToString(updTime),
                    label: "Last refresh"
                },
                {
                    value: dateToString(time),
                    label: "Stats for"
                }
            ]
        }
    ].map(value => (<Segment key={value.header + _id.address} {..._id} {...value} />));


    return  <div className="item eight wide computer sixteen wide tablet column">
                <div className="content">
                    <div className="ui segments">

                        <div className="ui segment">
                            
                            <h2 className="ui medium header">{ name }</h2>
                            <div className="ui tiny header">{ _id.address }
                            <div className="meta">{ _id.pool }</div>
                            </div>

                        </div>

                        {segments}

                    </div>
                </div>
            </div>

};

const Segment = ({header, values, address}) => {
    const stats = values.map((value) => (<Stat key={value.label + value.value + address} {...value}/>))
    return (
        <div className="ui segment">
        
            <p className="ui header">{header}</p>

            <div className="ui grid centered mini statistics">
                {stats}
            </div>
            
        </div>
    )
}

const Stat = ({label, value}) => {

    return(
        <div className="statistic">

            <div className="value">
                { value }
            </div>

            <div className="label">
                {label}
            </div>

        </div>
    )
}

export default PoolItem;
