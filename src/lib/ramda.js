import { curry, values, mapObjIndexed } from 'ramda'
export * from 'ramda'

export const mapValues = curry(
  (func, obj) => values(mapObjIndexed(func, obj))
)