import { createSelector } from 'reselect'

export const get = (entity) => createSelector(
  state => state.db.entities,
  (state, params) => params,
  (entities, params) => {
    if (!params?.id) {
      return entities[entity] || {}
    } else {
      return params.map(i => entities[entity][i])
    }
  }
)