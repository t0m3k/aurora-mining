import React from 'react';
import {dateToString} from '../../controllers/helper'
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import Typography from 'material-ui/Typography/Typography';
import List from 'material-ui/List/List';
import ListItemText from 'material-ui/List/ListItemText';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider/Divider';

const PoolItem = ({
        payAmount,
        avgHashRate,
        estPay,
        hashRate,
        usdPerDay,
        _id,
        address,
        pool,
        updTime,
        time, 
        coin,
        coinsPerDay,
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
                    value: (usdPerDay * rate).toFixed(2),
                    label: "day"
                },
                {
                    value: (usdPerDay * rate * 30).toFixed(2),
                    label: "month"
                },
                {
                    value: (usdPerDay * rate * 365).toFixed(2),
                    label: "year"
                }
            ]
        },
        {
            header: "Earnings - " + coin,
            values: [
                {
                    value: (coinsPerDay * 1).toFixed(4),
                    label: "day"
                },
                {
                    value: (coinsPerDay * 30).toFixed(4),
                    label: "month"
                },
                {
                    value: (coinsPerDay * 365).toFixed(4),
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
    ].map(value => (<Segment key={value.header + _id} address={address} pool={pool} {...value} />));


    return  <Grid 
                item
                xl={4}
                lg={6}
                md={6}
                sm={12}
                xs={12}
            >
                <Paper>
                <Typography type="headline" component="h2">
                    { name }
                </Typography>
                    <div className="ui tiny header">{ address }
                    <div className="meta">{ pool }</div>
                    </div>

                {segments}
                </Paper>

            </Grid>

};

const Segment = ({header, values, address}) => {
    const stats = values.map((value) => (<Stat key={value.label + value.value + address} {...value}/>))
    return (
        <Grid item>
            <Divider />
            <Typography type="subheading" component="h3">
                {header}
            </Typography>

            <List>
                {stats}            
            </List>
        </Grid>
    )
}

const Stat = ({label, value}) => {

    return(
        <ListItem>
            <ListItemText primary={value} secondary={label} />
        </ListItem>
    )
}

export default PoolItem;
