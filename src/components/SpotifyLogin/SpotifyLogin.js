import React from 'react'

import './spotify-login.css'

const SpotifyLogin = () => {
  return (
    <a className="login" href="http://localhost:3001/api/spotify/login">
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
