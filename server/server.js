const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const player = require('./routes/player')
const recommendations = require('./routes/recommendations')
const setAccessToken = require('./middleware')
const tracks = require('./routes/tracks')

const app = express()
const PORT = process.env.PORT || 3001
app.use(cors({ credentials: true, origin: process.env.FRONTEND_HOST }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(login)
app.use(callback)
app.use(player)
app.use(recommendations)
app.use(tracks)
app.use(setAccessToken)

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
