const axios = require('axios')
const express = require('express')

const router = express.Router()

router.put('/player/play', (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN

  const uri = req.body.uris[0]
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Cookie: `REFRESH_TOKEN=${refreshToken}`,
  }

  return axios
    .get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers,
    })
    .then(response => {
      let progress_ms
      let track_uri
      if (response.status === 204) {
        progress_ms = 0
        track_uri = undefined
      } else {
        progress_ms = response.data.progress_ms
        track_uri = response.data.item.uri
      }

      if (uri !== track_uri) {
        progress_ms = 0
      }
      return axios
        .put(
          'https://api.spotify.com/v1/me/player/play',
          {
            uris: [uri],
            position_ms: progress_ms,
          },
          {
            headers,
          },
        )
        .then(r => {
          res.locals.response = r
          next()
        })
        .catch(err => {
          res.status(err.response.status).send()
        })
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

router.put('/player/pause', (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN

  return axios
    .put('https://api.spotify.com/v1/me/player/pause', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `REFRESH_TOKEN=${refreshToken}`,
      },
    })
    .then(r => {
      res.locals.response = r
      next()
    })
    .catch(err => {
      const statusCode = err.response.status
      //   assume the playback is already paused
      if (statusCode === 403 && err.response.data.error.reason === 'UNKNOWN') {
        res.send('OK')
      } else {
        res.status(statusCode).send(err.response.data)
      }
    })
})

module.exports = router
