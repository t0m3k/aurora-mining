import axios from 'axios';
import * as userController from '../controllers/user';

export function fetchUser() {
    return (dispatch) =>{
        dispatch({type: "FETCH_USER_START"})
        axios.get('/users')
        .then(user => {
            dispatch({type: "FETCH_USER_DONE", ...user.data})
        })
    }
}

export function loginUser(username, password) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        userController.login(username, password)
        .then(() => fetchUser()(dispatch))
        .catch((err) => {
            if(err.response){
                if (err.response.status === 401) {
                    dispatch({type: "LOGIN_USER_ERROR", error: "Wrong username or password"})
                }
            }
        })
    }
}

export function registerUser(username, password) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        userController.register(username, password)
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
        userController.logout()
        .then(resp => {
            dispatch({type: "LOGOUT_USER"})
        })
    }
}
