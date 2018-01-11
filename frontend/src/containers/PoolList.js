import React, {Component} from 'react'
import PoolItem from '../components/PoolItem'
import { connect } from 'react-redux'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import AddPoolForm from '../components/Forms/AddPoolForm'
import Grid from 'material-ui/Grid/Grid'
import { SubmissionError } from 'redux-form'
import poolsControler from '../controllers/pools'
import {timeCounter} from '../controllers/helper'
import * as userActions from '../actions/user'


class PoolList extends Component {
    componentWillMount() {
        this.checkUpdates()
    }

    checkUpdates = () => {
        const update = this.props.user.pools.filter(pool => {
            return timeCounter(pool.updTime, 5)
        })
        update.forEach(pool => {
            this.updatePool(pool.pool, pool.address)
        })
    }

    updatePool = (pool, address) => {
        const dispatch = this.props.dispatch        
        poolsControler.getFresh[pool](address)
        .then(pool => {
            dispatch({ type: "UPDATE_POOL", pool })
        })
    }

    deletePool = (pool, address) => {
        const dispatch = this.props.dispatch
        const id = this.props.user._id
        return () => dispatch(userActions.deletePool(id, pool, address))
    }

    handleClickOpen = () => {
        const dispatch = this.props.dispatch
        dispatch({ type: "POOL_FORM_OPEN" });
    }

    handleClose = () => {
        const dispatch = this.props.dispatch
        dispatch({ type: "POOL_FORM_CLOSE" });
    }

    addPoolSubmit = ({address, pool, name}) => {
        const id = this.props.user._id
        const dispatch = this.props.dispatch

        return dispatch(userActions.addPool(id, address, pool, name))
        .then(resp => {
            this.checkUpdates()
        })
        .catch(err => {
            throw new SubmissionError({_error: err.response.data.message})
        })

    }

    render(){
        let pools = []

        const { addPoolForm } = this.props

        if(this.props.user.pools){
            pools = this.props.user.pools.map((pool) => (
                <PoolItem
                    key = {pool._id}
                    {...pool}
                    deleteAction = {this.deletePool}
                    currency = {this.props.currency.name}
                    rate = {this.props.currency.rate}
                />
                ));
        }

        pools.sort((a, b) => a.props.index - b.props.index)

        return (
        <div>
            <Grid 
                container
                justify='center'
                direction='row'
                spacing={24}
            >
                {pools}
            </Grid>
            <Button onClick={this.handleClickOpen} fab color="primary" aria-label="add" style={{position:"fixed", right:'1em', bottom:'1em'}}>
                <AddIcon />
            </Button>

            <Dialog
                maxWidth="sm"
                open={addPoolForm}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add pool</DialogTitle>
                <DialogContent>
                <AddPoolForm onSubmit={this.addPoolSubmit} handleClose={this.handleClose} />
                </DialogContent>
            </Dialog>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        addPoolForm: state.user.addPoolForm,
        currency: state.currency
    }
}

export default connect(mapStateToProps)(PoolList);
