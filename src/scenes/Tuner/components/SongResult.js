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
}) => {
  const classes = useStyles()
  const [liked, setLiked] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (playing && recentlyPlayed !== id) {
      setPlaying(false)
    }
  }, [recentlyPlayed])

  const toggleLike = () => {
    const newLikedState = !liked
    const cookies = document.cookie.split(';')
    const access_token = cookies[0].split('=')[1]
    const refresh_token = cookies[1].split('=')[1]
    if (newLikedState) {
      axios
        .put(`${process.env.REACT_APP_HOST}/tracks`, null, {
          params: {
            access_token: access_token,
            refresh_token: refresh_token,
            id: id,
          },
        })
        .catch(() => {
          console.error('Some error liking track')
        })
    } else {
      axios
        .delete(`${process.env.REACT_APP_HOST}/tracks`, {
          params: {
            access_token: access_token,
            refresh_token: refresh_token,
            id: id,
          },
        })
        .catch(() => {
          console.error('Some error unliking track')
        })
    }
    setLiked(newLikedState)
  }

  const togglePlay = () => {
    const newPlayState = !playing
    const cookies = document.cookie.split(';')
    const access_token = cookies[0].split('=')[1]
    const refresh_token = cookies[1].split('=')[1]
    const params = { access_token, refresh_token }
    if (newPlayState) {
      axios
        .put(
          `${process.env.REACT_APP_HOST}/player/play`,
          {
            uris: [uri],
          },
          {
            params,
          },
        )
        .then(() => {
          setRecentlyPlayed(id)
        })
        .catch(err => {
          if (err.response.status === 403) {
            console.log('User needs premium')
          } else if (err.response.status === 404) {
            console.log('An active device was not found.')
          } else {
            console.error('Some error playing track')
          }
        })
    } else {
      axios
        .put(`${process.env.REACT_APP_HOST}/player/pause`, null, {
          params,
        })
        .catch(err => {
          if (err.response.status === 403) {
            console.log('User needs premium')
          } else if (err.response.status === 404) {
            console.log('An active device was not found.')
          } else {
            console.error('Some error pausing track')
          }
        })
    }
    setPlaying(!playing)
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
