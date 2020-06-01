import React from 'react'

import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin'
import './App.css'

const App = () => {
  return (
    <div>
      <header>
        <div class="header__bg"></div>
        <h1>Spotify Recommendation Tuner</h1>
      </header>

      <section className="sign-in-area">
        <SpotifyLogin />
      </section>
    </div>
  )
}

export default App
