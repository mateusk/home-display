const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 3001
const dbURL = 'mongodb://localhost:27017/homedisplaydb'

// Starting the app:
const app = express()
app.use(express.json())
app.use(express.static('public')) // to access the files in public folder
app.use(cors())
app.use(fileUpload())

// Conecting with the DB:
async function databaseConnection() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
  } catch (error) {
    throw new Error('Cannot connect to the database!')
  }
  console.log('Connected to the database!')
}

databaseConnection()

// Requiring our models from our models folder:
requireDir('./models')

// Requiring our routes specified in /src/routes.js
app.use('/api', require('./routes'))

// Listening requests in port 3001:
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
