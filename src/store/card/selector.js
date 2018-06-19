import { createSelector } from "reselect"
import { entities } from 'app/db'
import { values, filter, compose, sortBy, prop } from "ramda";

export const all = entities.get('card')

export const allByList = createSelector(
  all,
  (state, { listId }) => listId,
  (cards, listId) => {
    return compose(
      sortBy(prop('position')),
      filter(card => card.listId == listId),
      values
    )(cards)
  }
)
