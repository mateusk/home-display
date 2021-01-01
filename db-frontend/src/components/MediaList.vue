<template>
  <div class="list row">
    <!-- TODO: Implement search
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by file name" v-model="searchTerm" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTerm">
            Search
          </button>
        </div>
      </div>
    </div> -->

    <div class="col-md-12">
      <b-pagination
        v-model="page"
        :total-rows="count"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>

    <div class="col-md-6">
      <h4>Media List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(media, index) in media"
          :key="index"
          @click="setActiveMedia(media, index)"
        >
          {{ media.fileURL }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentMedia">
        <h4>Media</h4>
        <div>
          <label><strong>File URL:</strong></label> {{ currentMedia.fileURL }}
        </div>

        <a class="badge badge-warning" :href="'/media/' + currentMedia._id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please select a media file...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MediaDataService from '../../services/MediaDataService'

export default {
  name: 'media-list',
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
  methods: {
    getRequestParams(searchTerm, page) {
      const params = {}
      if (searchTerm) params['searchTerm'] = searchTerm
      if (page) params['page'] = page
      return params
    },

    async retrieveMedia() {
      const params = this.getRequestParams(this.searchTerm, this.page)
      const mediaList = await MediaDataService.getAll(params)
      // console.log(mediaList)
      this.media = mediaList.data.docs
      this.count = mediaList.data.docs.length
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
  mounted() {
    this.retrieveMedia()
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
