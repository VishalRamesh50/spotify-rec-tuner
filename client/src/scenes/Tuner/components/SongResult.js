import { v4 as uuidv4 } from 'uuid'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PauseIcon from '@material-ui/icons/Pause'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  songResult: {
    marginBottom: theme.spacing(1.5),
  },
  albumCover: {
    float: 'left',
    position: 'relative',
    '& img': {
      width: '200px',
      marginRight: theme.spacing(4),
      transition: 'all 0.3s ease',
    },
    '&:hover img': {
      'webkit-filter': 'blur(10px)',
      filter: 'blur(10px)',
    },
    '&:hover img + div': {
      visibility: 'visible',
    },
  },
  songDisplay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontWeight: 800,
    width: '200px',
    height: '200px',
    position: 'absolute',
    zIndex: 5,
    top: 0,
    color: 'white',
    visibility: 'hidden',
    '-webkit-text-stroke': '0.5px black',
    transition: 'visibility 0.1s linear',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  songName: {
    fontSize: 18,
    width: '150px',
    minHeight: '2em',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  icon: {
    cursor: 'pointer',
  },
  playArrow: {
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '64px',
  },
  artistName: {
    maxWidth: '150px',
    fontSize: 16,
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
}))

const SongResult = ({
  id,
  uri,
  albumUrl,
  songName,
  artistName,
  recentlyPlayed,
  setRecentlyPlayed,
  errors,
  setErrors,
}) => {
  const classes = useStyles()
  const [liked, setLiked] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (recentlyPlayed !== id) {
      setPlaying(false)
    }
  }, [recentlyPlayed, id])

  const toggleLike = () => {
    const newLikedState = !liked
    let errorsCopy = [...errors]
    if (newLikedState) {
      axios
        .put(`${process.env.REACT_APP_HOST}/api/tracks`, null, {
          withCredentials: true,
          params: {
            id: id,
          },
        })
        .then(() => {
          setLiked(newLikedState)
        })
        .catch(err => {
          errorsCopy.push({
            id: uuidv4(),
            severity: 'error',
            text: 'There was some error adding track to library',
          })
          setErrors(errorsCopy)
        })
    } else {
      axios
        .delete(`${process.env.REACT_APP_HOST}/api/tracks`, {
          withCredentials: true,
          params: {
            id: id,
          },
        })
        .then(() => {
          setLiked(newLikedState)
        })
        .catch(err => {
          errorsCopy.push({
            id: uuidv4(),
            severity: 'error',
            text: 'There was some error removing track from library',
          })
          setErrors(errorsCopy)
        })
    }
  }

  const togglePlay = () => {
    const newPlayState = !playing
    let errorsCopy = [...errors]
    if (newPlayState) {
      axios
        .put(
          `${process.env.REACT_APP_HOST}/api/player/play`,
          {
            uris: [uri],
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setRecentlyPlayed(id)
          setPlaying(!playing)
        })
        .catch(err => {
          const response = err.response
          if (response) {
            if (response.status === 403) {
              errorsCopy.push({
                id: uuidv4(),
                severity: 'info',
                text: 'You need a Spotify premium account to play music.',
              })
              setErrors(errorsCopy)
              return
            } else if (response.status === 404) {
              errorsCopy.push({
                id: uuidv4(),
                severity: 'error',
                text: 'An active device was not found.',
              })
              setErrors(errorsCopy)
              return
            }
          }
          errorsCopy.push({
            id: uuidv4(),
            severity: 'error',
            text: 'Some error playing track.',
          })
          setErrors(errorsCopy)
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_HOST}/api/player/pause`, null, {
          withCredentials: true,
        })
        .then(() => {
          setPlaying(!playing)
        })
        .catch(err => {
          const response = err.response
          if (response) {
            if (response.status === 403) {
              errorsCopy.push({
                id: uuidv4(),
                severity: 'info',
                text: 'You need a Spotify premium account to play music.',
              })
              setErrors(errorsCopy)
              return
            } else if (response.status === 404) {
              errorsCopy.push({
                id: uuidv4(),
                severity: 'error',
                text: 'An active device was not found.',
              })
              setErrors(errorsCopy)
              return
            }
          }
          errorsCopy.push({
            id: uuidv4(),
            severity: 'error',
            text: 'Some error pausing track.',
          })
          setErrors(errorsCopy)
        })
    }
  }

  return (
    <div className={classes.songResult}>
      <div className={classes.albumCover}>
        <img src={albumUrl} alt="album-cover-art"></img>
        <div className={classes.songDisplay}>
          <div className={classes.topRow}>
            <div className={classes.songName}>{songName} </div>
            {liked ? (
              <FavoriteIcon className={classes.icon} onClick={toggleLike} />
            ) : (
              <FavoriteBorderIcon
                className={classes.icon}
                onClick={toggleLike}
              />
            )}
          </div>
          <div className={classes.playArrow}>
            {playing && recentlyPlayed === id ? (
              <PauseIcon
                className={classes.icon}
                onClick={togglePlay}
                fontSize="inherit"
              />
            ) : (
              <PlayArrowIcon
                className={classes.icon}
                onClick={togglePlay}
                fontSize="inherit"
              />
            )}
          </div>
          <div className={classes.artistName}>{`- ${artistName}`}</div>
        </div>
      </div>
    </div>
  )
}

export default SongResult
