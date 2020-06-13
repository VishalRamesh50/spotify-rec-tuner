import React from 'react'

import './spotify-login.css'

const SpotifyLogin = () => {
  return (
    <a className="login" href={`${process.env.REACT_APP_HOST}/login`}>
      <img
        className="spotify-logo"
        src="spotify-logo.png"
        alt="white spotify logo"
      ></img>
      Log In with Spotify
    </a>
  )
}

export default SpotifyLogin
