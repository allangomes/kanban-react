import { handleActions } from 'redux-actions'
import { from } from 'seamless-immutable'
import namespace from 'lib/namespace'

const initial = from({})

export const [set, remove, clean] = namespace('DB/CONTEXT/')('SET', 'REMOVE', 'CLEAN')

export default handleActions({
  [set]: (state, { payload }) => {
    const { value, keys } = payload
    return state.setIn(keys, value)
  },
  [remove]: (state, { payload }) => {
    const { keys } = payload
    return state.without(keys)
  },
  [clean]: () => initial
}, initial)
