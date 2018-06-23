import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './src/App'
import { whyDidYouUpdate } from 'why-did-you-update'

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept();

window.whyUpdated = function() {
  window.devtools.whyDidYouUpdate = true
  window.dispatchEvent(new CustomEvent('devtoolschange', { detail: window.devtools }))
}

window.addEventListener('devtoolschange', function (e) {
  if (e.detail.whyDidYouUpdate) {
    whyDidYouUpdate(React, {
      exclude: [/^Route/, /^Link/, /^Switch/, /^Button/, /^BreadcrumbSection/, /^Label/],
      groupByComponent: true
    })
  }
})
