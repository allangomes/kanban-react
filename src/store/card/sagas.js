import { call, takeLatest, put } from 'redux-saga/effects'
import { entities, context } from 'app/db'
import { CardSchema } from './schema'
import axios from 'axios'
import * as consts from './consts'
import { api } from 'app/api'


const url = (boardId) => `/board/${boardId}/card`

export function* loadAll({ payload }) {
  const { boardId } = payload
  yield context.set(true, "loading")
  const { data } = yield call(api.get, url(boardId))
  const result = yield entities.normalize(data.data, [CardSchema])
  yield context.set(result, 'data')
  yield context.remove("loading")
  return result
}

export function* save({ payload }) {
  const { boardId } = payload
  yield context.set(true, "loading")
  const { data } = yield call(api.post, url(boardId), payload)
  const result = yield entities.normalize(data, CardSchema)
  yield context.set([result], 'data')
  yield context.remove("loading")
  return result
}

export default function*() {
  yield takeLatest(consts.save, save)
  yield takeLatest(consts.load, loadAll)
}
