import axios from 'axios';
import * as currencyActions from './currency'
const LOCAL_STORAGE_USER_KEY = 'aurora-mining-user-auth'

const saveUserAuth = userAuth => localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userAuth))

const clearUserAuth = () => localStorage.removeItem(LOCAL_STORAGE_USER_KEY)

const getUserAuth = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
    } catch(e) {
        return undefined
    }
}


export function fetchUser() {
    return (dispatch) =>{
        dispatch({type: "FETCH_USER_START"})

        const localAuth = getUserAuth()

        console.log(localAuth)
        if(!localAuth) {
            return dispatch({type: "FETCH_USER_DONE", loggedIn: false, user: undefined})
        } else {
            return axios({
                method: 'get',
                url: '/api/users',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ localAuth.token }`
                }
            })
            .then(user => {
                dispatch({type: "FETCH_USER_DONE", ...user.data})
                if(user.data.user){
                    dispatch(currencyActions.getCurrency(user.data.user.currency))
                }
            })
        }
    }
}

export function registerUser(username, password, email, currency) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        axios.post('/api/users/register', {
            username, password, email, currency
        })
        .then((resp) => {
            console.log(resp)
            saveUserAuth(resp)
            fetchUser()(dispatch)
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

export function loginUser(username, password) {
    return (dispatch) => {
        dispatch({type: "LOGIN_USER_START"})
        return axios.post('/api/users/login', {
            username, password
        })
        .then((resp) => {
            saveUserAuth(resp.data)
            fetchUser()(dispatch)
            return Promise.resolve()
        })
    }
}

export function logoutUser() {
    return (dispatch) =>{
        clearUserAuth()
        dispatch({type: "LOGOUT_USER"})
    }
}
