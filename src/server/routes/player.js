const axios = require('axios')
const express = require('express')

const { updateToken } = require('../middleware')

const router = express.Router()
router.use(updateToken)

router.put('/player/play', (req, res) => {
  const access_token = res.locals.access_token
  const uri = req.body.uris[0]
  const headers = {
    Authorization: `Bearer ${access_token}`,
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
          console.log('Play success')
          res.status(r.status).send(r.data)
        })
        .catch(err => {
          res.status(err.response.status).send()
        })
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

router.put('/player/pause', (req, res) => {
  const access_token = res.locals.access_token

  return axios
    .put('https://api.spotify.com/v1/me/player/pause', null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(r => {
      console.log('Pause successful')
      res.status(r.status).send(r.data)
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
