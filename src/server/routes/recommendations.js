const axios = require('axios')
const express = require('express')

const { updateToken } = require('../middleware')

const router = express.Router()
router.use(updateToken)

router.get('/recommendations', (req, res) => {
  const accessToken = res.locals.access_token

  return axios
    .get('https://api.spotify.com/v1/recommendations', {
      params: req.query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      res.status(err.response.status).send(err.response.data)
    })
})

module.exports = router
