const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')
require('dotenv').config()

const callback = require('./routes/callback')
const login = require('./routes/login')
const player = require('./routes/player')
const recommendations = require('./routes/recommendations')
const setAccessToken = require('./middleware')
const tracks = require('./routes/tracks')

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(cors({ credentials: true, origin: process.env.FRONTEND_HOST }))
app.use(cookieParser())
app.use(bodyParser.json())

const router = express.Router()
app.use('/api', router)

router.use(login)
router.use(callback)
router.use(player)
router.use(recommendations)
router.use(tracks)
router.use(setAccessToken)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
