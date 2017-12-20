import { combineReducers } from 'redux';
import user from './user'
import pools from './pools'

const minerApp = combineReducers({
    user,
    pools
})

export default minerApp
