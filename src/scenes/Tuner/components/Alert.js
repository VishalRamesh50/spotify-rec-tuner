import React, { useEffect, useState } from 'react'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))

const TransitionAlerts = ({
  id,
  text,
  severity,
  errors,
  setErrors,
  autoClose = false,
  autoCloseTime = 3000,
}) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, autoCloseTime)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseTime])

  const onExited = () => {
    let errorsCopy = [...errors]
    errorsCopy = errorsCopy.filter(err => err.id !== id)
    setErrors(errorsCopy)
  }

  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <Collapse in={open} onExited={onExited}>
        <Alert
          className={classes.root}
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {text}
        </Alert>
      </Collapse>
    </ThemeProvider>
  )
}

export default TransitionAlerts
