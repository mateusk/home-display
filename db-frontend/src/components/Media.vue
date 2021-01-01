<template>
  <div v-if="currentMedia" class="edit-form">
    <h4>Media</h4>
    <form>
      <div class="form-group">
        <label for="fileURL">File URL</label>
        <input type="text" class="form-control" id="fileURL" v-model="currentMedia.fileURL" />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteMedia">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateMedia">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a media file...</p>
  </div>
</template>

<script>
import MediaDataService from '../../services/MediaDataService'

export default {
  name: 'media',
  data() {
    return {
      currentMedia: null,
      message: '',
    }
  },
  methods: {
    async getMedia(id) {
      const media = await MediaDataService.getSingle(id)
      this.currentMedia = media.data
    },

    async updateMedia() {
      await MediaDataService.update(this.currentMedia._id, this.currentMedia)
      this.message = 'The media file was updated successfully.'
    },

    async deleteMedia() {
      await MediaDataService.delete(this.currentMedia._id)
      this.$router.push({ name: 'media' })
    },
  },
  mounted() {
    this.message = ''
    this.getMedia(this.$route.params.id)
  },
}
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
