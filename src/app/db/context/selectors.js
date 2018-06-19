import { createSelector } from 'reselect'

export const loading = createSelector(
  state => state.db.context,
  (context, params) => context.loading
)