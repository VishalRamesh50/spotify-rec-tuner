import React from 'react'

import './spotify-login.css'

const SpotifyLogin = () => {
  return (
    <a
      className="login"
      href={`http://${process.env.REACT_APP_HOST}:3001/login`}
    >
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
