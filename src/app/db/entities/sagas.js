import { put } from 'redux-saga/effects'
import * as actions from './reducer'
import * as normalizr from 'normalizr'

export function* normalize(data, schema) {
  const { entities, result } = normalizr.normalize(data, schema)
  yield put(actions.set({ entities }))
  return yield result
}

export function* clean() {
  yield put(actions.clean())
}