import axios from 'axios'
import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import { StylesProvider } from '@material-ui/core/styles'

import Slider from './components/Slider/slider'
import SongResult from './components/SongResult/songResult'
import './tuner.css'

const Tuner = () => {
  const [recommendations, setRecommendations] = React.useState([])

  const getRecommendations = () => {
    const cookies = document.cookie.split(';')
    const access_token = cookies[0].split('=')[1]
    const refresh_token = cookies[1].split('=')[1]
    axios
      .get('http://localhost:3001/recommendations', {
        params: {
          access_token: access_token,
          refresh_token: refresh_token,
          limit: 12,
          min_popularity: 15,
          seed_genres: 'pop',
        },
      })
      .then(function (response) {
        setRecommendations(response.data.tracks)
      })
  }

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
          <Button
            variant="contained"
            color="primary"
            onClick={getRecommendations}
          >
            Update
          </Button>
        </StylesProvider>
      </div>
      <div className="recommendations">
        <header>
          <h1>Recommendations</h1>
        </header>
        <div className="song-results">
          {recommendations.map(track => (
            <SongResult
              key={track.id}
              songName={track.name}
              artistName={track.artists[0].name}
              albumUrl={track.album.images[1].url}
            ></SongResult>
          ))}
          {console.log(recommendations)}
        </div>
      </div>
    </div>
  )
}

export default Tuner
