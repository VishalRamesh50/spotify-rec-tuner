import Autocomplete from '@material-ui/lab/Autocomplete'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  autocomplete: {
    color: 'white',
    marginBottom: theme.spacing(2),
    width: '200px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1db954',
    },
  },
  autocompleteOption: {
    padding: theme.spacing(0),
    height: '40px',
  },
  input: {
    color: 'white',
  },
}))

export default function CheckboxesTags({ setSelectedSeedGenres }) {
  const classes = useStyles()
  const onChange = (event, selectedItems) => {
    setSelectedSeedGenres(selectedItems)
  }

  return (
    <Autocomplete
      multiple
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
      renderInput={params => {
        console.log(params)
        return (
          <TextField
            InputProps={{
              className: classes.input,
            }}
            {...params}
            variant="outlined"
            label="Seed Genres"
            InputLabelProps={{
              className: classes.input,
            }}
          />
        )
      }}
    />
  )
}

const genres = ['anime', 'edm', 'jazz', 'k-pop', 'piano', 'pop', 'work-out']
