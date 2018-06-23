import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './src/App'

ReactDOM.render(<App />, document.getElementById('root'))

module.hot.accept();

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React, {
    exclude: [/^Route/, /^Link/, /^Switch/],
    groupByComponent: true
  });
}
