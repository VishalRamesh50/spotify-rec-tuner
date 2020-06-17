import React from 'react'

import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin'
import './home.css'

const Home = () => {
  return (
    <div className="main-info">
      <header>
        <div className="header__bg"></div>
        <h1 className="title">Spotify Recommendation Tuner</h1>
      </header>

      <section className="sign-in-area">
        <SpotifyLogin />
      </section>
      <a href="https://www.github.com/VishalRamesh50/spotify-rec-tuner">
        <img className="github-logo" src="GitHub-Logo.png" alt="Github Link" />
      </a>
    </div>
  )
}

export default Home
