import { put } from 'redux-saga/effects'
import * as actions from './reducer'

export function* set(value, ...keys) {
  yield put(actions.set({ value, keys }))
}

export function* remove(...keys) {
  yield put(actions.remove({ keys }))
}

export function* clean() {
  yield put(actions.clean())
}