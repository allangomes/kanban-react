import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import sagas from './sagas'


const sagaMidleware = createSagaMiddleware()

// let loggerMidleware = () => next => next
let devtools = () => noop => noop

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__
  // loggerMidleware = createLogger({
  //   collapsed: (getState, action, logEntry) => !logEntry.error
  // })
}

export const history = createHistory()

export default createStore(reducers, undefined, compose(
  applyMiddleware(sagaMidleware, routerMiddleware(history), logger)
))

sagaMidleware.run(sagas)
