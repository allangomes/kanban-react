import { handleActions } from 'redux-actions'
import { from } from 'seamless-immutable'
import namespace from 'lib/namespace'
import { mapObjIndexed, merge } from 'ramda'

const initial = from({})

export const [set, clean] = namespace('DB/ENTITIES')('SET', 'CLEAN')

export default handleActions({
  [set]: (state, { payload }) => {
    const { entities } = payload
    const mutable = state.asMutable()
    mapObjIndexed((values, key) => {
      mutable[key] = merge(mutable[key], values)
    }, entities)
    return from(mutable)
  },
  [clean]: () => initial
}, initial)