const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Simple routing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to home display application.' })
})

// Set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
