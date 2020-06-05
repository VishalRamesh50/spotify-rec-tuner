const express = require('express')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const refresh = require('./routes/refresh')
const recommendations = require('./routes/recommendations')

const app = express()
const port = 3001

const allowOrigin = (req, res, next) => {
  const origin = req.get('origin')
  const allowedOrigins = [
    `http://${process.env.FRONTEND_HOST}:3000`,
    `http://${process.env.EXPRESS_HOST}:3001`,
  ]
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  next()
}
app.use(allowOrigin)

app.use(login)
app.use(callback)
app.use(refresh)
app.use(recommendations)

app.listen(port, () => console.log(`Listening on port ${port}!`))
