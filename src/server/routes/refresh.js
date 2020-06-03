const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/refresh', (req, res) => {
  const refresh_token = req.query.refresh_token

  if (!refresh_token) {
    res.status(400).send({ ERROR: 'No token provided.' })
    return
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
    params: {
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
    },
    json: true,
  }

  axios(authOptions)
    .then(response => {
      const access_token = response.data.access_token
      res.send({
        access_token: access_token,
        refresh_token: response.data.refresh_token,
      })
    })
    .catch(err => {
      console.error('There was an error with refresh')
      return
    })
})

module.exports = router
