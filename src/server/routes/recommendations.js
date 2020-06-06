const axios = require('axios')
const express = require('express')

const { updateToken } = require('../middleware')

const router = express.Router()
router.use(updateToken)

router.get('/recommendations', async (req, res) => {
  const access_token = res.locals.access_token
  const params = { ...req.query }
  delete params['access_token']
  delete params['refresh_token']

  return axios
    .get('https://api.spotify.com/v1/recommendations', {
      params: params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      res.send(response.data)
    })
    .catch(err => {
      res.status(err.response.status).send()
    })
})

module.exports = router
