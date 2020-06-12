const axios = require('axios')

axios.interceptors.response.use(null, error => {
  console.log('in error interceptor')
  if (error.response && error.response.status === 401) {
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

const setAccessToken = (req, res, next) => {
  const { response } = res.locals
  let access_token = response.request
    .getHeader('Authorization')
    .replace('Bearer ', '')
  if (req.cookies.ACCESS_TOKEN !== access_token) {
    res.cookie('ACCESS_TOKEN', access_token, { overwrite: true })
  }
  res.send(response.data)
}

module.exports = setAccessToken
