const user = (state = 
    {
        user: {
            username: null,
            currency: "USD"
        },
        error: null,
        loggedIn: false
    },
     action) => {
    switch(action.type) {
        case 'FETCH_USER_START':
            return {
                ...state,
                logging: true
            }
        case 'FETCH_USER_DONE':
            return {
                ...state,
                user: action.user,
                loggedIn: action.loggedIn,
                logging: false
            }
        case 'LOGIN_USER_START':
            return {
                ...state,
                logging: true,
            }
        case 'LOGIN_USER_ERROR':
            return {
                ...state,
                logging: false,
                error: action.error
            }
        case 'LOGOUT_USER':
            return {
                user: {},
                loggedIn: false
            }
        default:
            return state
    }
}

export default user
 