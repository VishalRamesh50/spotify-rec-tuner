import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import './index.css'
import Home from './scenes/Home/Home'
import Tuner from './scenes/Tuner/Tuner'

export const serverHost = process.env.REACT_APP_HOST || window.location.origin

axios.defaults.proxy.host = process.env.REACT_APP_HOST
axios.interceptors.response.use(null, error => {
  if (error.response && error.response.status === 401) {
    window.location.href = `${serverHost}/api/login?show_dialog=true`
    return new Promise(() => {})
  }

  return Promise.reject(error)
})

export const theme = createMuiTheme({
  root: {
    spotifyGreen: '#1db954',
  },
  breakpoints: {
    keys: ['xs', 'xs', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 550,
      md: 850,
      lg: 1280,
      xl: 1920,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/tuner" component={Tuner} />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
