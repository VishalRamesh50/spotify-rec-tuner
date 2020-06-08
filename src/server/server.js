const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const player = require('./routes/player')
const recommendations = require('./routes/recommendations')
const tracks = require('./routes/tracks')
const { crossOrigin } = require('./middleware')

const app = express()
const PORT = process.env.PORT || 3001
app.use(cookieParser())
app.use(bodyParser.json())
app.use(crossOrigin)

app.use(login)
app.use(callback)
app.use(player)
app.use(recommendations)
app.use(tracks)

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
