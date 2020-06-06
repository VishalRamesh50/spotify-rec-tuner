import Autocomplete from '@material-ui/lab/Autocomplete'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  autocomplete: {
    color: 'white',
    marginBottom: theme.spacing(2),
    width: '300px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.root.spotifyGreen,
    },
    '& :hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(30,215,96)',
    },
    '& :not(:focus) .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(30,215,96)',
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
    '& span.MuiAutocomplete-tag': {
      color: 'white',
    },
    '& .MuiButtonBase-root': {
      color: 'white',
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiFormLabel-root': {
      color: 'white',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'unset',
      maxWidth: '300px',
    },
  },
  autocompleteOption: {
    padding: theme.spacing(0),
  },
}))

export default function CheckboxesTags({ setSelectedSeedGenres, error }) {
  const classes = useStyles()
  const onChange = (event, selectedItems) => {
    setSelectedSeedGenres(selectedItems)
  }

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="checkboxes-tags-demo"
      className={classes.autocomplete}
      classes={{
        option: classes.autocompleteOption,
      }}
      options={genres}
      disableCloseOnSelect
      onChange={onChange}
      getOptionLabel={option => option}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox checked={selected} />
          {option}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField {...params} variant="outlined" label="Seed Genres" />
      )}
    />
  )
}

const genres = ['anime', 'edm', 'jazz', 'k-pop', 'piano', 'pop', 'work-out']
