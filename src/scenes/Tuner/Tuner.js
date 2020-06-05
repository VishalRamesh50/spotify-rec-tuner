import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'

import GenreSelector from './components/GenreSelector'
import Slider from './components/Slider'
import SongResult from './components/SongResult'

const useStyles = makeStyles(theme => ({
  tuner: {
    display: 'flex',
  },
  sidePanel: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 20px',
    backgroundColor: 'rgb(18, 18, 18)',
    width: 'fit-content',
    height: '100vh',
    '& a': {
      color: 'inherit',
      fontSize: '28px',
    },
  },
  homeIcon: {
    marginBottom: '10px',
  },
  updateButton: {
    backgroundColor: '#1db954',
    padding: '5px 0 !important',
  },
  recommendations: {
    padding: theme.spacing(3, 3),
    backgroundImage: 'linear-gradient(rgb(40, 40, 40), rgb(18, 18, 18))',
    width: '100%',
    '& h1': {
      color: 'white',
      marginBottom: '20px',
      textTransform: 'uppercase',
      font: '48px Poppins',
      fontWeight: 1000,
    },
  },
  songResults: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
}))

const Tuner = () => {
  const [recommendations, setRecommendations] = React.useState([])
  const [selectedSeedGenres, setSelectedSeedGenres] = React.useState([])

  const getRecommendations = () => {
    if (selectedSeedGenres.length === 0) {
      return
    }
    let attributes = {}
    const sliderTitleElements = document.getElementsByClassName(
      'MuiTypography-root',
    )
    for (let titleElement of sliderTitleElements) {
      const title = titleElement.innerText.toLowerCase()
      const slider = titleElement.nextElementSibling
      const disabled = slider.className.includes('Mui-disabled')
      if (!disabled) {
        const thumbs = slider.getElementsByClassName('MuiSlider-thumb')
        const min_value = +thumbs[0].getAttribute('aria-valuenow')
        const max_value = +thumbs[1].getAttribute('aria-valuenow')
        attributes[`min_${title}`] = min_value
        attributes[`max_${title}`] = max_value
      }
    }
    let seedGenres = ''
    for (let genre of selectedSeedGenres) {
      seedGenres += `,${genre}`
    }
    const cookies = document.cookie.split(';')
    const access_token = cookies[0].split('=')[1]
    const refresh_token = cookies[1].split('=')[1]
    axios
      .get(`http://${process.env.REACT_APP_HOST}:3001/recommendations`, {
        params: {
          access_token: access_token,
          refresh_token: refresh_token,
          market: 'US',
          seed_genres: seedGenres,
          ...attributes,
        },
      })
      .then(function (response) {
        setRecommendations(response.data.tracks)
      })
      .catch(err => {
        console.error('Some error calling /recommendations')
        console.error(err)
      })
  }

  const classes = useStyles()

  return (
    <div className={classes.tuner}>
      <div className={classes.sidePanel}>
        <a href="/">
          <HomeIcon className={classes.homeIcon} fontSize="inherit"></HomeIcon>
        </a>
        <GenreSelector setSelectedSeedGenres={setSelectedSeedGenres} />
        <Slider name="Acousticness" min={0} max={1} step={0.01}></Slider>
        <Slider name="Danceability" min={0} max={1} step={0.01}></Slider>
        <Slider name="Energy" min={0} max={1} step={0.01}></Slider>
        <Slider name="Instrumentalness" min={0} max={1} step={0.01}></Slider>
        <Slider name="Liveness" min={0} max={1} step={0.01}></Slider>
        <Slider name="Loudness" min={-60} max={0} step={1}></Slider>
        <Slider name="Popularity" min={0} max={100} step={1}></Slider>
        <Slider name="Speechiness" min={0} max={1} step={0.01}></Slider>
        <Slider name="Tempo" min={0} max={200} step={1}></Slider>
        <Slider name="Valence" min={0} max={1} step={0.01}></Slider>
        <Button
          className={classes.updateButton}
          variant="contained"
          color="primary"
          onClick={getRecommendations}
        >
          Update
        </Button>
      </div>
      <div className={classes.recommendations}>
        <header>
          <h1>Recommendations</h1>
        </header>
        <div className={classes.songResults}>
          {recommendations.map(track => (
            <SongResult
              key={track.id}
              songName={track.name}
              artistName={track.artists[0].name}
              albumUrl={track.album.images[1].url}
            ></SongResult>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tuner
