import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const TransitionAlerts = ({ open, setOpen }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          A seed genre must be selected!
        </Alert>
      </Collapse>
    </ThemeProvider>
  )
}

export default TransitionAlerts
