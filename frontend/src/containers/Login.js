import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/user'
import LoginForm from '../components/Forms/LoginForm'
import { SubmissionError } from 'redux-form'

class Login extends Component {

    submit = (values) => {
        const dispatch = this.props.dispatch
        const {username, password} = values

        console.log('SUBMIT LOGIN FORM')

        return dispatch(userActions.loginUser(username, password))
        .then(() => {
        })
        .catch((err) => {
            if(err.response){
                if (err.response.status === 400) {
                    console.log("Wrong username or password")
                    dispatch({type: "LOGIN_USER_ERROR", error: "Wrong username or password"})
                    throw new SubmissionError({_error: "Wrong username or password."})
                }
            }
            else {
                dispatch({type: "LOGIN_USER_ERROR", error: "Unknwonw error"})
                throw new SubmissionError({_error: "Unknwonw error."})
            }
        })
    }

    render() {

        console.log(this.props)

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
