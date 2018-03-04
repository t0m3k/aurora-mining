import React from 'react'
import {dateToString} from '../controllers/Helper'
import Grid from 'material-ui/Grid/Grid'
import Paper from 'material-ui/Paper/Paper'
import Typography from 'material-ui/Typography/Typography'
import ListItemText from 'material-ui/List/ListItemText'
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider/Divider'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField/TextField'
import IconButton from 'material-ui/IconButton/IconButton'
import CloseIcon from 'material-ui-icons/Close'


const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            
        },
        [theme.breakpoints.down('sm')]: {
        },
    },
    listItem: {
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: 0
        },
    },
    heading: {
        textAlign: 'center'
    }
  })

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
        unpaid,
        classes,
        deleteAction
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
    ].map(value => (<Segment key={value.header + _id} classes={classes} address={address} pool={pool} {...value} />));


    return  <Grid 
                item
                xl={3}
                lg={4}
                md={6}
                sm={10}
                xs={12}
                >
            
                <Paper className={classes.root}>
                <IconButton onClick={deleteAction(pool, address)}>
                    <CloseIcon />
                </IconButton>
                <Typography type="headline" className={classes.heading} component="h2">
                    { name }
                </Typography>
                    <TextField
                    fullWidth
                    disabled
                    value={ address }
                    />

                    <Typography className={classes.heading}>
                        { pool }
                    </Typography>

                {segments}
                </Paper>

            </Grid>

};

const Segment = ({header, values, address, classes}) => {
    const stats = values.map((value) => (<Stat key={value.label + value.value + address} classes={classes} {...value}/>))
    return (
        <Grid item>
            <Divider />
            <Typography className={classes.heading} type="subheading" component="h3">
                {header}
            </Typography>

            <Grid 
                container
                justify={'center'}
                spacing={0}
            >
                {stats}            
            </Grid>
        </Grid>
    )
}

const Stat = ({label, value, classes}) => {

    return(
    <Grid 
        item
        xl={4}
        lg={4}
        md={4}
        sm={4}
        xs={6}
    >
        <ListItem className={classes.listItem} >
            <ListItemText primary={value} secondary={label} />
        </ListItem>
    </Grid>
    )
}

export default withStyles(styles)(PoolItem)
