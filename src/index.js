import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import createRootReducer from './reducers'
import createMiddleware from './middleware'

import Routing from './components/Routing'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })

const store = createStore(createRootReducer(history), createMiddleware(history))

ReactDOM.render(
   <Provider store={store}>
      <Routing history={history} />
   </Provider>,
   document.getElementById('root')
)
serviceWorker.unregister()
