import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
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

const SongResult = ({ albumUrl, songName, artistName }) => {
  const classes = useStyles()
  const [liked, setLiked] = React.useState(false)

  const toggleLike = () => {
    const newLikedState = !liked
    setLiked(newLikedState)
    if (newLikedState) {
      console.log('Add this track to the liked song for the user')
    } else {
      console.log('Remove this track from the liked song for the user')
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
            <PlayArrowIcon className={classes.icon} fontSize="inherit" />
          </div>
          <div className={classes.artistName}>{`- ${artistName}`}</div>
        </div>
      </div>
    </div>
  )
}

export default SongResult
