import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import aco from './aco'


const rootReducer = combineReducers({
  aco,
  routing: routerReducer
});

export default rootReducer