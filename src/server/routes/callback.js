const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/callback', (req, res) => {
  const code = req.query.code || null

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
        ).toString('base64'),
    },
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    json: true,
  }

  axios.post(authOptions, (error, response, body) => {
    if (!error && res.statusCode === 200) {
      res.cookie('ACCESS_TOKEN', body.access_token)
      res.cookie('REFRESH_TOKEN', body.refresh_token)
      res.cookie('REFRESH_CODE', code)

      res.redirect('http://localhost:3000/tuner')
    } else {
      res.redirect('/')
      console.error('There was an error in authentication. Try again.')
    }
  })
})

module.exports = router
