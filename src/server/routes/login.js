const express = require('express')

const router = express.Router()

router.get('/login', (req, res) => {
  const showDialog = req.query.show_dialog || false
  let scopes =
    'user-library-modify,user-read-currently-playing,user-modify-playback-state'
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      `&client_id=${process.env.CLIENT_ID}` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}` +
      `&show_dialog=${showDialog}`,
  )
})

module.exports = router
