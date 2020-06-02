import React from 'react'
import { StylesProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

import './slider.css'

export default function RangeSlider({ name }) {
  const generateRandomRange = () => {
    let x = +Math.random().toFixed(2)
    let y = +Math.random().toFixed(2)
    while (Math.abs(x - y) < 0.3 || Math.abs(x - y) > 0.7) {
      x = +Math.random().toFixed(2)
      y = +Math.random().toFixed(2)
    }
    return [x, y]
  }
  const [value, setValue] = React.useState(generateRandomRange)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <StylesProvider injectFirst>
      <Typography id="range-slider" gutterBottom>
        {name}
      </Typography>
      <Slider
        value={value}
        className="slider"
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={() => {
          return value
        }}
        min={0}
        max={1}
        step={0.01}
      />
    </StylesProvider>
  )
}
