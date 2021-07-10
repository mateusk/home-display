<template>
  <div v-if="currentMedia" class="edit-form">
    <h4>Media</h4>
    <br />
    <div v-if="!editCompleted">
      <h5>{{ currentMedia.fileName }}</h5>
      <button class="btn btn-danger" @click="deleteMedia">
        Delete
      </button>
      <br />
      <br />
      <form>
        <div class="form-group">
          <label for="newUploadedFile">Update file:</label>
          <input
            id="newUploadedFile"
            ref="mediafiles"
            type="file"
            accept=".jpg, .jpeg, .png, .mp4"
            class="form-control"
            required
            name="newUploadedFile"
            @change="onFileChange"
          />
          <br />
          <button :disabled="!selectedFile" type="button" class="btn btn-success" @click="updateMedia">
            Update
          </button>
        </div>
      </form>
    </div>

    <div v-else>
      <h5>{{ newFileName }}</h5>
      <br />
      <p>{{ message }}</p>
      <button class="btn btn-dark" @click="reset">Return to Media list</button>
    </div>
  </div>
</template>

<script>
import MediaDataService from '../../services/MediaDataService'

export default {
  name: 'EditMedia',
  data() {
    return {
      currentMedia: null,
      message: '',
      selectedFile: false,
      newFileName: '',
      fileToUpload: '',
      editCompleted: false,
    }
  },

  mounted() {
    this.message = ''
    this.getMedia(this.$route.params.id)
  },

  methods: {
    async getMedia(id) {
      const media = await MediaDataService.getSingle(id)
      this.currentMedia = media.data
    },

    onFileChange(e) {
      const [file] = e.target.files
      this.fileToUpload = file // accessing file
      this.selectedFile = true
    },

    async updateMedia() {
      const formData = new FormData()
      formData.append('file', this.fileToUpload) // appending file

      const updatedMedia = await MediaDataService.update(this.currentMedia.id, formData)
      this.newFileName = updatedMedia.data.fileName
      this.message = 'The media file was updated successfully.'
      this.editCompleted = true
    },

    async deleteMedia() {
      await MediaDataService.delete(this.currentMedia.id)
      this.message = 'The media file was deleted successfully.'
      this.editCompleted = true
    },

    reset() {
      this.currentMedia = null
      this.message = ''
      this.selectedFile = false
      this.newFileName = ''
      this.fileToUpload = ''
      this.editCompleted = false
      this.$router.push({ name: 'media' })
    },
  },
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
