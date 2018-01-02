const user = (state = 
    {
        user: {
            username: null,
            currency: "USD"
        },
        error: false,
        errorMsg: '',
        loggedIn: false,
        loading: false,
        addPoolForm: false
    },
     action) => {
    switch(action.type) {
        case 'FETCH_USER_START':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_USER_DONE':
        let user = action.user || {}
            return {
                user: user,
                loggedIn: action.loggedIn,
                loading: false
            }
        case 'LOGIN_USER_START':
            return {
                ...state,
                loading: true,
            }
        case 'POOL_FORM_OPEN':
            return {
                ...state,
                addPoolForm: true,
            }
        case 'POOL_FORM_CLOSE':
            return {
                ...state,
                addPoolForm: false,
            }
        case 'LOGIN_USER_ERROR':
            return {
                ...state,
                loading: false,
                loggedIn: false,
                error: true,
                errorMsg: action.error
            }
        case 'UPDATE_POOL':
            const pools = state.user.pools.map(p => {
                if((p.pool !== action.pool.pool) && (p.address !== action.pool.address)){
                    return p
                }
                return {...action.pool, name: p.name, _id: p._id }
            })
            console.log(pools, action.pool)
            return {
                ...state,
                user: {
                    ...user,
                    pools
                }
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
 