const axios = require('axios')
const express = require('express')

const router = express.Router()

const getRecommendations = async (access_token, params) => {
  return axios
    .get('https://api.spotify.com/v1/recommendations', {
      params: params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(res => {
      console.log('Got a successful response')
      return res
    })
    .catch(err => {
      console.log(err)
      return err.response
    })
}

router.get('/recommendations', async (req, res) => {
  console.log('Recommendation hit!')
  let access_token = req.query.access_token
  const params = { ...req.query }
  delete params['access_token']
  delete params['refresh_token']

  let recommendations = await getRecommendations(access_token, params)
  if (recommendations.status === 401) {
    console.log('inside if condition')
    const refresh_token = req.query.refresh_token
    axios
      .get('http://localhost:3001/refresh', {
        params: { refresh_token: refresh_token },
      })
      .then(async response => {
        access_token = response.data.access_token
        const refresh_token = response.data.refresh_token
        recommendations = await getRecommendations(access_token, params)
        if (recommendations.status === 200) {
          res.cookie('ACCESS_TOKEN', access_token)
          res.cookie('REFRESH_TOKEN', refresh_token)
          res.send(recommendations.data)
        } else {
          console.log('Tell them to authenticate again')
          //   res.redirect('http://localhost:3001/login')
        }
      })
  } else if (recommendations.status === 200) {
    res.send(recommendations.data)
  } else {
    console.error('Something broke badly')
    res.status(recommendations.status).send()
  }
})

module.exports = router
