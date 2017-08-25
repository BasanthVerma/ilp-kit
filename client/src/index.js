/* globals global */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import Tracker from './tracker'

// Font awesome
import 'font-awesome/scss/font-awesome.scss'
import 'theme/font-awesome.config'

import createFinalStore from './redux/store'
import ApiClient from './helpers/ApiClient'

import App from 'containers/App/App'

import registerServiceWorker from './registerServiceWorker'

global.socket = io('', {path: '/api/socket.io'})
global.tracker = new Tracker()

const history = createHistory()

const render = Component => {
  ReactDOM.render(
    <Provider store={createFinalStore(new ApiClient(), history)}>
      <ConnectedRouter history={history}>
        <Route path='/' component={Component} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'))
}

render(App)

if (module.hot) {
  module.hot.accept('containers/App/App', () => {
    const NextApp = require('containers/App/App').default
    render(NextApp)
  });
}

registerServiceWorker()
