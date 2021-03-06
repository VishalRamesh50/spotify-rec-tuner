const axios = require('axios')

axios.interceptors.response.use(null, error => {
  if (
    !error.config.visited &&
    error.response &&
    error.response.status === 401
  ) {
    error.config.visited = true
    const refreshToken = error.config.headers.Cookie.split('=')[1]

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
        const accessToken = response.data.access_token
        error.config.headers.Authorization = `Bearer ${accessToken}`
        return axios.request(error.config)
      })
      .catch(() => {
        return Promise.reject(error)
      })
  }

  return Promise.reject(error)
})

const setAccessToken = (req, res) => {
  const { response } = res.locals
  let access_token = response.request
    .getHeader('Authorization')
    .replace('Bearer ', '')
  if (req.cookies.ACCESS_TOKEN !== access_token) {
    res.cookie('ACCESS_TOKEN', access_token, {
      overwrite: true,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    })
  }
  res.status(response.status).send(response.data)
}

module.exports = setAccessToken
