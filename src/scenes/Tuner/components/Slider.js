import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { theme } from '../../../index'

const useStyles = makeStyles(theme => ({
  selector: {
    display: 'flex',
  },
  slider: {
    width: '200px',
    color: theme.root.spotifyGreen,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },
  sliderName: {
    margin: theme.spacing(0),
  },
  checkbox: {
    padding: theme.spacing(0),
    paddingTop: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}))

const RangeSlider = ({ name, min, max, step }) => {
  const generateRandomNumber = (min, max, numDecimals) => {
    return +(Math.random() * (max - min) + min).toFixed(numDecimals)
  }
  const generateRandomRange = () => {
    const difference = max - min
    const splitStep = step.toString().split('.')
    const numDecimals = splitStep.length === 1 ? 0 : splitStep[1].length
    let x = generateRandomNumber(min, max, numDecimals)
    let y = generateRandomNumber(min, max, numDecimals)
    while (
      Math.abs(x - y) < 0.3 * difference ||
      Math.abs(x - y) > 0.7 * difference
    ) {
      x = generateRandomNumber(min, max, numDecimals)
      y = generateRandomNumber(min, max, numDecimals)
    }
    return [x, y]
  }
  const [value, setValue] = React.useState(generateRandomRange)
  const [selected, setSelected] = React.useState(false)

  const classes = useStyles()

  const onSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.selector}>
      <Checkbox
        className={classes.checkbox}
        style={{
          color: theme.root.spotifyGreen,
        }}
        onChange={() => setSelected(!selected)}
      />
      <div>
        <Typography
          className={classes.sliderName}
          id="range-slider"
          gutterBottom
        >
          {name}
        </Typography>
        <Slider
          className={classes.slider}
          value={value}
          disabled={!selected}
          onChange={onSliderChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={() => {
            return value
          }}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  )
}

export default RangeSlider
