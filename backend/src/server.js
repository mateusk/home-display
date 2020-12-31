const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const dbURL = 'mongodb://localhost:27017/homedisplaydb'

// Starting the app:
const app = express()
app.use(express.json())
app.use(cors())

// Conecting with the DB:
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

// Requiring our models from our models folder:
requireDir('./models')

// Requiring our routes specified in /src/routes.js
app.use('/api', require('./routes'))

// Listening requests in port 3001:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
