import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import './index.css'
import Home from './scenes/Home/Home'
import Tuner from './scenes/Tuner/Tuner'

export const theme = createMuiTheme({
  root: {
    spotifyGreen: '#1db954',
  },
  breakpoints: {
    keys: ['xs', 'xs', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 550,
      md: 800,
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
