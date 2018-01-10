import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import LoginForm from '../components/Forms/LoginForm'
import SubmissionError from 'redux-form/lib/SubmissionError'
import { destroy } from 'redux-form';

class Login extends Component {

    submit = (values) => {
        const dispatch = this.props.dispatch
        const {username, password} = values

        return dispatch(userActions.loginUser(username, password))
        .then(() => {
            dispatch(destroy('login'))
        })
        .catch((err) => {
            if(err.response){
                if (err.response.status === 400) {
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

        const {errorMsg} = this.props

        return (
            <div>
                <LoginForm errorMsg={errorMsg} onSubmit={this.submit} />
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
