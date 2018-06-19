import * as R from 'ramda'

export function buildStyle<T>(prop: T, css): T {
  const result = R.mapObjIndexed((value, key) => {
    const overrideCond = (value, key) => {
      return value && css[key]
    }
    let overrides = value
    overrides = R.is(Array, overrides) ? overrides.join(' ') : overrides
    overrides = R.is(Object, overrides) ? R.mapObjIndexed(overrideCond, overrides) : overrides
    return `${css[key]} ${overrides}`
  }, prop)
  return result
}