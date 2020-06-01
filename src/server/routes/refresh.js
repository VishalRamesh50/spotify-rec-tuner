const axios = require('axios')
const express = require('express')

const router = express.Router()

router.get('/refresh', (req, res) => {
  const refresh_token = req.query.token

  if (!refresh_token) {
    res.status(400).send({ ERROR: 'No token provided.' })
    return
  }

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
      refresh_token,
      grant_type: 'refresh_token',
    },
    json: true,
  }

  axios.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({ access_token })
    } else {
      res.status(401).send()
    }
  })
})

module.exports = router
