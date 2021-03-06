const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const mediaSchema = new mongoose.Schema(
  {
    fileType: {
      type: String,
      required: true,
    },
    fileURL: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { virtuals: true, versionKey: false }
)

// Adding the "mongoose-paginate" plugin, to allow
// for pagination of requests:
mediaSchema.plugin(mongoosePaginate)

// Passing the above schema to a Mongoose model:
mongoose.model('Media', mediaSchema)
