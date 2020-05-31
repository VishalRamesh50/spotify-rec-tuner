import React from 'react'

import SpotifyLoginButton from './components/SpotifyLoginButton/SpotifyLoginButton'
import './App.css'

const App = () => {
  return (
    <div>
      <header>
        <div class="header__bg"></div>
        <h1>Spotify Recommendation Tuner</h1>
      </header>

      <section className="sign-in-area">
        <SpotifyLoginButton />
      </section>
    </div>
  )
}

export default App
