import React from 'react'

import './spotify-login-button.css'

const SpotifyLoginButton = () => {
  return (
    <button>
      <img
        className="spotify-logo"
        src="spotify-logo.png"
        alt="white spotify logo"
      ></img>
      Log In with Spotify
    </button>
  )
}

export default SpotifyLoginButton
