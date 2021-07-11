<template>
  <div class="list row">
    <!-- TODO: Implement search -->
    <!-- <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by file name" v-model="searchTerm" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTerm">
            Search
          </button>
        </div>
      </div>
    </div> -->

    <!-- TODO: Make pagination work -->
    <!-- <div class="col-md-12">
      <b-pagination
        v-model="page"
        :total-rows="count"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div> -->

    <div class="col-md-6">
      <h4>Media List</h4>
      <ul v-if="count > 0" class="list-group">
        <li
          v-for="(mediaItem, index) in media"
          :key="index"
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          @click="setActiveMedia(mediaItem, index)"
        >
          {{ mediaItem.fileName }}
        </li>
      </ul>
      <div v-if="count === 0">
        <br />
        <p>There are no uploaded media files yet!</p>
      </div>
    </div>
    <div class="col-md-6">
      <div v-if="currentMedia">
        <h4>Media</h4>
        <div>
          <label><strong>File name:</strong></label> {{ currentMedia.fileName }}
        </div>

        <a class="badge badge-warning" :href="'/media/' + currentMedia.id"> Edit file </a>
      </div>
      <div v-if="count > 0 && !currentMedia">
        <br />
        <p>Please select a media file...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MediaDataService from '../services/MediaDataService'

export default {
  name: 'MediaList',
  data() {
    return {
      media: [],
      currentMedia: null,
      currentIndex: -1,
      searchTerm: '',
      page: 1,
      count: 0,
    }
  },
  mounted() {
    this.retrieveMedia()
  },
  methods: {
    getRequestParams(searchTerm, page) {
      const params = {}
      if (searchTerm) params.searchTerm = searchTerm
      if (page) params.page = page
      return params
    },

    async retrieveMedia() {
      const params = this.getRequestParams(this.searchTerm, this.page)
      const mediaList = await MediaDataService.getAll(params)
      this.media = mediaList.data
      this.count = mediaList.data.length
    },

    refreshList() {
      this.retrieveMedia()
      this.currentMedia = null
      this.currentIndex = -1
    },

    setActiveMedia(media, index) {
      this.currentMedia = media
      this.currentIndex = index
    },

    handlePageChange(value) {
      this.page = value
      this.retrieveMedia()
    },
  },
}
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
