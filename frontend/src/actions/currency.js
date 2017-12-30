import * as helpers from '../controllers/helper'

export function getCurrency(currency) {
    return (dispatch) =>{
        dispatch({type: "FETCH_CURRENCY_START"})
        helpers.getCurrency(currency)
        .then(r => {
            dispatch({type: "FETCH_CURRENCY_DONE", ...r})
        })
    }
}
