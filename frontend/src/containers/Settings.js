import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import SettingsForm from '../components/Forms/SettingsForm'
import { SubmissionError } from 'redux-form'

class Settings extends Component {

    submit = ({currency}) => {
        const dispatch = this.props.dispatch
        const id = this.props.user._id
        

        dispatch(userActions.updateUser(id, currency))
        .catch((err) => {
            throw new SubmissionError({_error: "Uknown error."})
        })
        
    }

    render() {
        const currency = this.props.user.currency

        return (
            <div>
                <SettingsForm currency = { currency } onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user,
        currency: state.currency
    }
}

export default connect(mapStateToProps)(Settings);
