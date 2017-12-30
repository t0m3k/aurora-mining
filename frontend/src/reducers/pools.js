const pool = (state = 
    [{
        _id: {
            pool: null,
            address: null
        },
        name: null,
        index: 0
    }],
    action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.user,
                loggedIn: true
            }
        case 'LOGOUT':
            return {
                user: {},
                loggedIn: false
            }
        default:
            return state
    }
}

export default pool
 