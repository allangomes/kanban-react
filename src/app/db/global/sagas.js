import { put } from 'redux-saga/effects'
import * as actions from './reducer'

export function* set(value, ...keys) {
  yield put(actions.set({ value, keys }))
}

export function* clean() {
  yield put(actions.clean())
}