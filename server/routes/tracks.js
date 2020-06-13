const axios = require('axios')
const express = require('express')

const router = express.Router()

router.put('/tracks', (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN

  return axios
    .put('https://api.spotify.com/v1/me/tracks', null, {
      params: { ids: req.query.id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `REFRESH_TOKEN=${refreshToken}`,
      },
    })
    .then(response => {
      response.data = 'OK'
      res.locals.response = response
      next()
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

router.delete('/tracks', (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN

  return axios
    .delete('https://api.spotify.com/v1/me/tracks', {
      params: { ids: req.query.id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `REFRESH_TOKEN=${refreshToken}`,
      },
    })
    .then(response => {
      response.data = 'SUCCESS'
      res.locals.response = response
      next()
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

module.exports = router
