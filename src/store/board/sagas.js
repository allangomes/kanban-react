import { call, takeEvery } from 'redux-saga/effects'
import { entities, context } from 'app/db'
import { BoardSchema } from './schema'
import axios from 'axios'
import * as consts from './consts'
import { LOCATION_CHANGE } from 'react-router-redux'
import { api } from 'app/api'

const url = "/board"

function* locationUpdate({ payload }) {
  if (payload.pathname.startsWith("/board")) {
    yield loadAll()
  }
}

function* loadAll() {
  yield context.set(true, "loading")
  const { data } = yield call(api.get, url)
  const result = yield entities.normalize(data.data, [BoardSchema])
  yield context.set(result, 'data')
  yield context.remove("loading")
  return result
}

function* save({ payload }) {
  yield context.set(true, "loading")
  const { data } = yield call(api.post, url, payload)
  const result = yield entities.normalize(data, BoardSchema)
  yield context.set([result], 'data')
  yield context.remove("loading")
  return result
}

function* load({ payload }) {
  const result = yield entities.normalize(payload, BoardSchema)
  yield context.set([result], 'data')
  return result
}

export default function*() {
  yield takeEvery('BOARD/SAVE', save)
  yield takeEvery('BOARD/LOAD', load)
  yield takeEvery(LOCATION_CHANGE, locationUpdate)
}
