const user = (state = {loggedIn: false}, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.user,
                loggedIn: true
            }
        default:
            return state
    }
}

export default user
