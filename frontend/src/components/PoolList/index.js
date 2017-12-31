import React, {Component} from 'react'
import PoolItem from './PoolItem'
import { connect } from 'react-redux'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import AddPoolForm from '../Forms/AddPoolForm'
import axios from 'axios'
import * as userActions from '../../actions/user'
import Grid from 'material-ui/Grid/Grid';


class PoolList extends Component {

    handleClickOpen = () => {
        const dispatch = this.props.dispatch
        dispatch({ type: "POOL_FORM_OPEN" });
    }

    handleClose = () => {
        const dispatch = this.props.dispatch
        console.log(dispatch)     
        dispatch({ type: "POOL_FORM_CLOSE" });
    }

    addPoolSubmit = (values) => {
        const username = this.props.user.username
        const url = `/users/u/${username}`
        const dispatch = this.props.dispatch

        axios.post(url, {
            address: values.address,
            pool: values.pool,
            name: values.name
        })
        .then(resp =>{
            console.log(resp)
            dispatch(userActions.fetchUser());
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
