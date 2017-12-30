const currency = (state = 
    {
        name: 'USD',
        rate: 1,
        error: false,
        errorMsg: '',
        loading: false
    },
     action) => {
    switch(action.type) {
        case 'FETCH_CURRENCY_START':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_CURRENCY_DONE':
            return {
                name: action.name,
                rate: action.rate,
                error: false,
                errorMsg: '',
                loading: false
            }
        case 'FETCH_CURRENCY_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.error
            }
        default:
            return state
    }
}

export default currency
 