import React from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import './songResult.css'

const SongResult = ({ albumUrl, songName, artistName }) => {
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
    <div className="song-result">
      <div className="album-cover">
        <img src={albumUrl} alt="album-cover-art"></img>
        <div className="song-display">
          <div className="top-row">
            <div className="song-name">{songName} </div>
            {liked ? (
              <FavoriteIcon onClick={toggleLike} />
            ) : (
              <FavoriteBorderIcon onClick={toggleLike} />
            )}
          </div>
          <div className="play-arrow">
            <PlayArrowIcon fontSize="inherit" />
          </div>
          <div className="artist-name">{`- ${artistName}`}</div>
        </div>
      </div>
    </div>
  )
}

export default SongResult
