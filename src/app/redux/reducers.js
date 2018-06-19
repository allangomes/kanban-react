import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import db from 'app/db/reducer'

export default combineReducers({
  db,
  router: routerReducer
})