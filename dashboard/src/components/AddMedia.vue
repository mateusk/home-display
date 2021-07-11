<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="fileUpload">File: </label>
        <input
          id="fileUpload"
          ref="mediafiles"
          type="file"
          accept=".jpg, .jpeg, .png, .mp4"
          class="form-control"
          required
          name="fileUpload"
          @change="onFileChange"
        />
      </div>

      <button class="btn btn-success" type="button" :disabled="!selectedFile" @click="uploadMedia">Upload</button>
    </div>

    <div v-else>
      <h4>You submitted the media file successfully!</h4>
      <button class="btn btn-dark" @click="reset">Return to Media list</button>
    </div>
  </div>
</template>

<script>
import MediaDataService from '../services/MediaDataService'

export default {
  name: 'AddMedia',
  data() {
    return {
      media: {
        fileName: '',
        id: '',
      },
      submitted: false,
      selectedFile: false,
      fileToUpload: '',
    }
  },

  methods: {
    async uploadMedia() {
      const formData = new FormData()
      formData.append('file', this.fileToUpload) // appending file
      const newMedia = await MediaDataService.store(formData)
      // console.log(newMedia)
      // console.log(`newMedia.data.id: ${newMedia.data.id}`)
      // console.log(`newMedia.data.fileName: ${newMedia.data.fileName}`)
      this.media.id = newMedia.data.id
      this.media.fileName = newMedia.data.fileName
      this.submitted = true
    },

    onFileChange(e) {
      const [file] = e.target.files
      this.fileToUpload = file // accessing file
      this.selectedFile = true
    },

    reset() {
      this.submitted = false
      this.selectedFile = false
      this.fileToUpload = ''
      this.media.file = ''
      this.media.fileName = ''
      this.$router.push({ name: 'media' })
    },
  },
}
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
