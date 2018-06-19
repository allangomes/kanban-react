import board from 'store/board/sagas'
import list from 'store/list/sagas'
import card from 'store/card/sagas'
import { fork, takeEvery } from 'redux-saga/effects'
import { context, entities } from 'app/db'
import { LOCATION_CHANGE } from 'react-router-redux'

function* locationUpdate({ payload }) {
  yield context.clean()
  yield entities.clean()
}

export default function*() {
  yield takeEvery(LOCATION_CHANGE, locationUpdate)
  yield fork(board)
  yield fork(list)
  yield fork(card)
}