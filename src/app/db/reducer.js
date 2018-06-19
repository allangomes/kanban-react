import { combineReducers } from 'redux'
import entities from './entities/reducer'
import context from './context/reducer'
import global from './global/reducer'

export default combineReducers({
  entities,
  context,
  global
})
