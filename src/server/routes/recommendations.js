const axios = require('axios')
const express = require('express')
const setAccessToken = require('../middleware')

const router = express.Router()

router.get('/recommendations', (req, res, next) => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN

  return axios
    .get('https://api.spotify.com/v1/recommendations', {
      params: req.query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `REFRESH_TOKEN=${refreshToken}`,
      },
    })
    .then(response => {
      res.locals.response = response
      next()
    })
    .catch(err => {
      res.status(err.response.status).send(err.response.data)
    })
})

router.use(setAccessToken)

module.exports = router
