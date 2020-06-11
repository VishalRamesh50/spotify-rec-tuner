const axios = require('axios')

const updateToken = (req, res, next) => {
  const refreshToken = req.cookies.REFRESH_TOKEN

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
    params: {
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    },
    json: true,
  }

  return axios(authOptions)
    .then(response => {
      const { access_token } = response.data
      res.locals.access_token = access_token
      res.cookie('ACCESS_TOKEN', access_token, { overwrite: true })
      next()
    })
    .catch(err => {
      res.status(401).send()
    })
}

module.exports = { updateToken }
