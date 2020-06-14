import React from 'react'

import './spotify-login.css'
import { serverHost } from '../../../../index'

const SpotifyLogin = () => {
  return (
    <a className="login" href={`${serverHost}/api/login`}>
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
