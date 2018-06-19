import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

export const Redux = (props) => {
  return (
    <Provider {...props} store={store} />
  )
}