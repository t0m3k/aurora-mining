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
        if(!localAuth) {
            dispatch({type: "FETCH_USER_DONE", loggedIn: false, user: undefined})
            return(Promise.resolve())
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
                return Promise.resolve()
            })
            .catch(err => {
                clearUserAuth()
                dispatch({type: "FETCH_USER_DONE", loggedIn: false})
            })
        }
    }
}

export function registerUser(username, password, email, currency) {
    return (dispatch) =>{
        dispatch({type: "LOGIN_USER_START"})
        return axios.post('/api/users/register', {
            username, password, email, currency
        })
        .then((resp) => {
            saveUserAuth(resp)
            fetchUser()(dispatch)
            return Promise.resolve()
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

export function deletePool(id, pool, address) {
    return (dispatch) => {
        const localAuth = getUserAuth()

        const url = `/api/users/u/${id}/${pool}/${address}`
        return axios({
            method: 'delete',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localAuth.token }`
            }
        })
        .then((resp) => {
            fetchUser()(dispatch)
            return Promise.resolve()
        })
    }
}

export function updateUser(id, currency) {
    return (dispatch) => {
        const localAuth = getUserAuth()

        const url = `/api/users/u/${id}/`
        return axios({
            method: 'put',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localAuth.token }`
            },
            data: {
                currency
            }
        })
        .then((resp) => {
            fetchUser()(dispatch)
            return Promise.resolve()
        })
    }
}

export function addPool(id, address, pool, name) {
    return (dispatch) => {
        const localAuth = getUserAuth()

        const url = `/api/users/u/${id}/`
        return axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localAuth.token }`
            },
            data: {
                address,
                pool,
                name
            }
        })
        .then((resp) => {
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
