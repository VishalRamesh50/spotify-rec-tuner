import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import { StylesProvider } from '@material-ui/core/styles'

import Slider from './components/Slider/slider'
import './tuner.css'

const Tuner = () => {
  return (
    <div className="tuner">
      <div className="side-panel">
        <a href="/">
          <HomeIcon fontSize="inherit"></HomeIcon>
        </a>
        <Slider name="Acousticness"></Slider>
        <Slider name="Danceability"></Slider>
        <Slider name="Energy"></Slider>
        <Slider name="Instrumentalness"></Slider>
        <Slider name="Liveness"></Slider>
        <Slider name="Loudness"></Slider>
        <Slider name="Popularity"></Slider>
        <Slider name="Speechiness"></Slider>
        <Slider name="Tempo"></Slider>
        <Slider name="Valence"></Slider>
        <StylesProvider injectFirst>
          <Button variant="contained" color="primary">
            Update
          </Button>
        </StylesProvider>
      </div>
      <div className="recommendations">
        <header>
          <h1>Recommendations</h1>
        </header>
      </div>
    </div>
  )
}

export default Tuner
