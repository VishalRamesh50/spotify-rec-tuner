import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'

import './index.css'
import Home from './scenes/Home/Home'
import Tuner from './scenes/Tuner/Tuner'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/tuner" component={Tuner} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
