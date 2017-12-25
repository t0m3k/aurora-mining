import axios from 'axios';

export function login(username, password) {
    return axios.post('/users/login', {
        username: username,
        password: password
    })
}

export function register(username, password) {
    return axios.post('/users/register', {
        username: username,
        password: password
    })
}

export function logout() {
    return axios.get('/users/logout')
}
