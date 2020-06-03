const express = require('express')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const refresh = require('./routes/refresh')

const app = express()
const port = 3001

const allowOrigin = (req, res, next) => {
  const origin = req.get('origin')
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  }
  next()
}
app.use(allowOrigin)

app.use(login)
app.use(callback)
app.use(refresh)

app.listen(port, () => console.log(`Listening on port ${port}!`))
