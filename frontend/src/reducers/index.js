import { combineReducers } from 'redux';
import user from './user'
import currency from './currency'

import {reducer as formReducer} from 'redux-form'

const minerApp = combineReducers({
    user,
    currency,
    form: formReducer
})

export default minerApp
