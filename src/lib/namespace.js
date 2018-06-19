import { createActions } from 'redux-actions'

export default (value) => (...actions) => {
  return Object.values(createActions(...actions.map(action => value + action)))
}