const axios = require('axios')
const express = require('express')

const { updateToken } = require('../middleware')

const router = express.Router()
router.use(updateToken)

router.put('/tracks', (req, res) => {
  const access_token = res.locals.access_token
  const { id } = req.query

  return axios
    .put('https://api.spotify.com/v1/me/tracks', null, {
      params: { ids: id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(() => {
      res.send('OK')
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

router.delete('/tracks', (req, res) => {
  const access_token = res.locals.access_token
  const { id } = req.query

  return axios
    .delete('https://api.spotify.com/v1/me/tracks', {
      params: { ids: id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(() => {
      res.send('SUCCESS')
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

module.exports = router
