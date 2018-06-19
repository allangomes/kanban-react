import { all, call, takeLatest } from 'redux-saga/effects'
import { entities, context } from 'app/db'
import { ListSchema } from './schema'
import axios from 'axios'
import * as consts from './consts'
import * as card from 'store/card/sagas'
import { api } from 'app/api'

const url = (boardId) => `/board/${boardId}/list`

function* loadAll({ payload }) {
  const { boardId } = payload
  yield context.set(true, "loading")
  const { data } = yield call(api.get, url(boardId))
  const result = yield entities.normalize(data.data, [ListSchema])
  yield context.set(result, 'data')
  yield context.remove("loading")
  return result
}

function* save({ payload }) {
  const { boardId } = payload
  yield context.set(true, "loading")
  const { data } = yield call(api.post, url(boardId), payload)
  const result = yield entities.normalize(data, ListSchema)
  yield context.set([result], 'data')
  yield context.remove("loading")
  return result
}

function* loadContext(action) {
  yield all([
    loadAll(action),
    card.loadAll(action)
  ])
}

export default function*() {
  yield takeLatest(consts.save, save)
  yield takeLatest(consts.load, loadContext)
}
