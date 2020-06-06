const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const { crossOrigin } = require('./middleware')
const callback = require('./routes/callback')
const login = require('./routes/login')
const recommendations = require('./routes/recommendations')

const app = express()
const PORT = process.env.PORT || 3001
app.use(cookieParser())
app.use(crossOrigin)

app.use(login)
app.use(callback)
app.use(recommendations)

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
