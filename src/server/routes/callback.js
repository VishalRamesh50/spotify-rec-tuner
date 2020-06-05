const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/callback', (req, res) => {
  const code = req.query.code || null

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code',
    },
    json: true,
  }

  axios(authOptions)
    .then(response => {
      res.cookie('ACCESS_TOKEN', response.data.access_token)
      res.cookie('REFRESH_TOKEN', response.data.refresh_token)
      res.cookie('REFRESH_CODE', code)

      res.redirect(`http://${process.env.FRONTEND_HOST}:3000/tuner`)
    })
    .catch(err => {
      console.error('There was an error in authentication. Try again.')
      console.error(err)
      res.redirect(`http://${process.env.FRONTEND_HOST}:3000`)
    })
})

module.exports = router
