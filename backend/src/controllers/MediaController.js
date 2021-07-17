/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const Media = mongoose.model('Media')
const mediaFolder = process.env.MEDIA_FOLDER

// This function replaces the '_id' property from mongoDB with 'id',
// to avoid ESLint complaints in the frontend:
function replaceId(object) {
  const returnObject = object.toObject()
  returnObject.id = object._id
  delete returnObject._id
  return returnObject
}

module.exports = {
  // This getAll() method requests all items stored in the DB, passing
  // a page as a parameter and returns a JSON containing results paginated
  // (limit of 10 items per page, default page of requestuest is 1):
  async getAll(request, response) {
    const { page = 1 } = request.query
    const dbResults = await Media.paginate({}, { page, limit: 10 })
    const mediaList = dbResults.docs.map(media => replaceId(media))

    return response.json(mediaList)
  },

  async store(request, response) {
    if (!request.files) return response.status(500).send({ msg: 'File not found' })
    // Accessing the file
    const uploadedFile = request.files.file
    const uploadedFileName = uploadedFile.name
    const uploadedFileURL = `${mediaFolder}/${uploadedFile.name}`
    const uploadedFileType = path.extname(uploadedFileURL)

    try {
      // mv() method places the file inside public directory
      console.log(uploadedFileURL)
      await uploadedFile.mv(uploadedFileURL)
    } catch (error) {
      return response.status(500).send({ msg: 'Error occured while storing the uploaded file in the server' })
    }

    const savedMedia = await Media.create({
      fileName: uploadedFileName,
      fileURL: uploadedFileURL,
      fileType: uploadedFileType,
    })

    const returnMedia = replaceId(savedMedia)

    // Returning the saved media object:
    return response.json(returnMedia)
  },

  async getSingle(request, response) {
    const mediaDbEntry = await Media.findById(request.params.id)
    const returnMedia = replaceId(mediaDbEntry)

    return response.json(returnMedia)
  },

  async update(request, response) {
    if (!request.files) return response.status(500).send({ msg: 'File not found' })

    const uploadedFile = request.files.file
    const uploadedFileName = uploadedFile.name
    const uploadedFileURL = `${mediaFolder}/${uploadedFile.name}`
    const uploadedFileType = path.extname(uploadedFileURL)

    const existingMediaEntry = await Media.findById(request.params.id)
    const existingFileURL = existingMediaEntry.fileURL

    try {
      // Remove existing file:
      await fs.unlinkSync(existingFileURL)
    } catch (error) {
      return response.status(500).send({ msg: 'Error occured while removing existing file in the server' })
    }

    try {
      // Upload new file:
      await uploadedFile.mv(uploadedFileURL)
    } catch (error) {
      return response.status(500).send({ msg: 'Error occured while storing the uploaded file in the server' })
    }

    // Update file entry in the DB:
    const mediaDbEntry = await Media.findByIdAndUpdate(
      request.params.id,
      {
        fileName: uploadedFileName,
        fileURL: uploadedFileURL,
        fileType: uploadedFileType,
      },
      { new: true }
    )

    const returnMedia = replaceId(mediaDbEntry)
    return response.json(returnMedia)
  },

  async delete(request, response) {
    const existingMediaEntry = await Media.findById(request.params.id)
    const existingFileURL = existingMediaEntry.fileURL

    try {
      // Remove existing file:
      await fs.unlinkSync(existingFileURL)
    } catch (error) {
      return response.status(500).send({ msg: 'Error occured while removing existing file in the server' })
    }

    await Media.findByIdAndRemove(request.params.id)

    return response.send()
  },

  async getRandom(request, response) {
    const randomMediaDbEntry = await Media.aggregate([{ $sample: { size: 1 } }])
    const returnMedia = replaceId(randomMediaDbEntry)

    return response.json(returnMedia)
  },

  async searchTerm(request, response) {
    const { searchTerm } = request.query
    const condition = searchTerm ? { searchTerm: { $regex: new RegExp(searchTerm), $options: 'i' } } : {}
    const dbSearchResults = await Media.find(condition)
    const returnResult = dbSearchResults.docs.map(media => replaceId(media))

    return response.json(returnResult)
  },
}
