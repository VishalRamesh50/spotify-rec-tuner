import React from 'react'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}))

const ResultsAlert = ({ numResults }) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        {numResults > 0 ? (
          <Alert severity="success">Found {numResults} results!</Alert>
        ) : (
          <Alert severity="info">
            Couldn't find any results for your search. Try different ranges!
          </Alert>
        )}
      </div>
    </ThemeProvider>
  )
}

export default ResultsAlert
