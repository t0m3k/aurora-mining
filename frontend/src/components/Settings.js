import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import SettingsForm from './Forms/SettingsForm'
import { SubmissionError } from 'redux-form'
import axios from 'axios'

class Settings extends Component {

    submit = (values) => {
        const dispatch = this.props.dispatch
        const username = this.props.user.username
        const url = `/api/users/u/${ username }`
        return axios.update(url, {
            password: values.password, currency: values.currency
        })
        .then((resp) => {
            dispatch(userActions.fetchUser());
        })
        .catch((err) => {
            if(err.response){
                if (err.response.status === 409) {
                    dispatch({type: "LOGIN_USER_ERROR", error: "This username is taken."})
                    throw new SubmissionError({username: "This username is taken."})
                } else {
                    dispatch({type: "LOGIN_USER_ERROR", error: "Uknown error."})
                    throw new SubmissionError({_error: "Uknown error."})
                    
                }
            }
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
