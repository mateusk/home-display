const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const mediaSchema = new mongoose.Schema({
  fileType: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Adding the "mongoose-paginate" plugin, to allow
// for pagination of requests:
mediaSchema.plugin(mongoosePaginate)

// Passing the above schema to a Mongoose model:
mongoose.model('Media', mediaSchema)
