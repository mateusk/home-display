const mongoose = require('mongoose')
const Media = mongoose.model('Media')

module.exports = {
  // This getAll() method requests all items stored in the DB, passing
  // a page as a parameter and returns a JSON containing results paginated
  // (limit of 10 items per page, default page of requestuest is 1):
  async getAll(request, response) {
    const { page = 1 } = request.query
    const media = await Media.paginate({}, { page, limit: 10 })

    return response.json(media)
  },

  async store(request, response) {
    const media = await Media.create(request.body)

    return response.json(media)
  },

  async getSingle(request, response) {
    const media = await Media.findById(request.params.id)

    return response.json(media)
  },

  async update(request, response) {
    const media = await Media.findByIdAndUpdate(request.params.id, request.body, { new: true })

    return response.json(media)
  },

  async delete(request, response) {
    const media = await Media.findByIdAndRemove(request.params.id)

    return response.send()
  },

  async getRandom(request, response) {
    const media = await Media.aggregate([{ $sample: { size: 1 } }])

    return response.json(media)
  },
}
