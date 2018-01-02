import axios from 'axios';
import * as currencyActions from './currency'

export function fetchUser() {
    return (dispatch) =>{
        dispatch({type: "FETCH_USER_START"})
        axios.get('/api/users')
        .then(user => {
            dispatch({type: "FETCH_USER_DONE", ...user.data})
            if(user.data.user){
                dispatch(currencyActions.getCurrency(user.data.user.currency))
            }

        })
    }
}

export function registerUser(username, password, email, currency) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        axios.post('/api/users/register', {
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
                    dispatch({type: "LOGIN_USER_ERROR", error: "Unknown error"})
                }
            }
        })
    }
}

export function logoutUser() {
    return (dispatch) =>{
        axios.get('/api/users/logout')
        .then(resp => {
            dispatch({type: "LOGOUT_USER"})
        })
    }
}
