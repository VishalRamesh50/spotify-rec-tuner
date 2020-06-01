const express = require('express')

const router = express.Router()

router.get('/login', (req, res) => {
  let scopes = ''
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      `&client_id=${process.env.CLIENT_ID}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`,
  )
})

module.exports = router
