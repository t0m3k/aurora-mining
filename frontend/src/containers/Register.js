import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import RegisterForm from '../components/Forms/RegisterForm'
import { SubmissionError } from 'redux-form'
import axios from 'axios'

class Register extends Component {

    submit = (values) => {
        const dispatch = this.props.dispatch
        dispatch({type: "LOGIN_USER_START"})
        return axios.post('/api/users/register', {
            username: values.username, password: values.password, email: values.email, currency: values.currency
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


        return (
            <div>
                <RegisterForm onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.user
    }
  }

export default connect(mapStateToProps)(Register);
