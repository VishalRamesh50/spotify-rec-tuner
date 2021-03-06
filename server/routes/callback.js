const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/callback', (req, res) => {
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
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
    },
    json: true,
  }

  const frontendHost =
    process.env.NODE_ENV === 'production' ? '' : process.env.FRONTEND_HOST

  axios(authOptions)
    .then(response => {
      res.cookie('ACCESS_TOKEN', response.data.access_token, {
        overwrite: true,
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      })
      res.cookie('REFRESH_TOKEN', response.data.refresh_token, {
        overwrite: true,
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      })

      res.redirect(`${frontendHost}/tuner`)
    })
    .catch(err => {
      res.redirect(`${frontendHost}`)
    })
})

module.exports = router
