const axios = require('axios')

const crossOrigin = (req, res, next) => {
  const origin = req.get('origin')
  const allowedOrigins = [process.env.FRONTEND_HOST, process.env.EXPRESS_HOST]
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    )
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  }
  next()
}

const updateToken = (req, res, next) => {
  const refreshToken = req.query.refresh_token

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
      const { access_token, refresh_token } = response.data
      res.locals.access_token = access_token
      res.cookie('ACCESS_TOKEN', access_token, { overwrite: true })
      res.cookie('REFRESH_TOKEN', refresh_token, { overwrite: true })
      next()
    })
    .catch(err => {
      res.status(401).send()
    })
}

module.exports = { updateToken, crossOrigin }
