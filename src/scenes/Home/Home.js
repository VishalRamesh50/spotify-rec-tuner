import React from 'react'

import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin'
import './home.css'

const Home = () => {
  return (
    <div className="main-info">
      <header>
        <div class="header__bg"></div>
        <h1 className="title">Spotify Recommendation Tuner</h1>
      </header>

      <section className="sign-in-area">
        <SpotifyLogin />
      </section>
    </div>
  )
}

export default Home
