import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

import App from './App.jsx'
import './index.css'

// En volvemos el App con BrowserRouter para que React router funcione
// Tambien con Provider de Redux para usar un estado global en el App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
  </React.Fragment>
)
