import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import LoginForm from './Forms/LoginForm'
import { SubmissionError } from 'redux-form'
import axios from 'axios'

class Login extends Component {

    submit = (values) => {
        const dispatch = this.props.dispatch
        dispatch({type: "LOGIN_USER_START"})
        return axios.post('/api/users/login', {
            username: values.username,
            password: values.password
        })
        .then(() => dispatch(userActions.fetchUser()))
        .catch((err) => {
            if(err.response){
                if (err.response.status === 401) {
                    dispatch({type: "LOGIN_USER_ERROR", error: "Wrong username or password"})
                    throw new SubmissionError({_error: "Wrong username or password"})
                }
            }
            else {
                dispatch({type: "LOGIN_USER_ERROR", error: "Unknwonw error"})
                throw new SubmissionError({_error: "Unknwonw error"})
            }
        })
        
    }

    render() {
        return (
            <div>
                <LoginForm onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.user
    }
  }

export default connect(mapStateToProps)(Login);
