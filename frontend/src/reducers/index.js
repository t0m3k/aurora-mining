import { combineReducers } from 'redux';
import user from './user'
import pools from './pools'
import currency from './currency'

import {reducer as formReducer} from 'redux-form'

const minerApp = combineReducers({
    user,
    pools,
    currency,
    form: formReducer
})

export default minerApp
