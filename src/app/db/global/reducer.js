import { handleActions } from 'redux-actions'
import { from } from 'seamless-immutable'
import namespace from 'lib/namespace'

const initial = from({
  teste: "DEU BOOOM"
})

export const [set, clean] = namespace('DB/SHARED')('SET', 'CLEAN')

export default handleActions({
  [set]: (state, { entities }) => state.set(entities),
  [clean]: () => initial
}, initial)
