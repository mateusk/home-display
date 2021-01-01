<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="fileURL">File URL</label>
        <input
          type="file"
          ref="mediafiles"
          accept=".jpg, .jpeg, .png, .mp4"
          @change="onFileChange"
          class="form-control"
          id="fileURL"
          required
          name="fileURL"
        />
      </div>

      <button @click="saveMedia" class="btn btn-success">Save</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newMedia">Add</button>
    </div>
  </div>
</template>

<script>
import MediaDataService from '../../services/MediaDataService'

export default {
  name: 'add-media',
  data() {
    return {
      media: {
        fileURL: '',
        fileType: '',
      },
      submitted: false,
    }
  },
  methods: {
    async saveMedia() {
      const data = {
        fileURL: this.media.fileURL,
        fileType: this.media.fileType,
      }
      console.log(data)
      const newMedia = await MediaDataService.store(data)
      this.media.id = newMedia.data._id
      console.log(newMedia.data)
      this.submitted = true
    },

    newMedia() {
      this.submitted = false
      this.media = {}
    },

    onFileChange() {
      const fileURL = this.$refs.mediafiles.files[0].name
      const fileType = this.$refs.mediafiles.files[0].type
      this.media.fileURL = fileURL
      this.media.fileType = fileType
      console.log(this.media)
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
