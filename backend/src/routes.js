// Requiring the Express
const express = require('express')
const routes = express.Router()

const mediaController = require('./controllers/MediaController')

routes.get('/media', mediaController.getAll)
routes.get('/media/:id', mediaController.getSingle)
routes.post('/media', mediaController.store)
routes.put('/media/:id', mediaController.update)
routes.delete('/media/:id', mediaController.delete)

module.exports = routes
