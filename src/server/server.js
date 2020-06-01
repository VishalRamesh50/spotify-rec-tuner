const express = require('express')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const refresh = require('./routes/refresh')

const app = express()
const port = 3001

app.use(login)
app.use(callback)
app.use(refresh)

app.listen(port, () => console.log(`Listening on port ${port}!`))
