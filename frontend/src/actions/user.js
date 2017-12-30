import axios from 'axios';
import * as currencyActions from './currency'

export function fetchUser() {
    return (dispatch) =>{
        dispatch({type: "FETCH_USER_START"})
        axios.get('/users')
        .then(user => {
            dispatch({type: "FETCH_USER_DONE", ...user.data})
            console.log(user.data)
            if(user.data.user){
                dispatch(currencyActions.getCurrency(user.data.user.currency))
            }

        })
    }
}

export function registerUser(username, password, email, currency) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        axios.post('/users/register', {
            username, password, email, currency
        })
        .then((resp) => {
            console.log(resp);
            fetchUser()(dispatch);
        })
        .catch((err) => {
            if(err.response){
                if (err.response.status === 409) {
                    dispatch({type: "LOGIN_USER_ERROR", error: "This username is taken."})
                } else {
                    dispatch({type: "LOGIN_USER_ERROR", error: "Uknown error"})
                }
            }
        })
    }
}

export function logoutUser() {
    return (dispatch) =>{
        axios.get('/users/logout')
        .then(resp => {
            dispatch({type: "LOGOUT_USER"})
        })
    }
}
