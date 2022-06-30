<script setup>
  import { onMounted, ref } from 'vue'
  import MediaPlayer from '../components/MediaPlayer.vue'

  const media = ref(null)

  onMounted(() => {
    fetch('/media.json')
      .then((res) => res.json())
      .then((out) => {
        console.log('media list: ', out.mediaList)
        media.value = out.mediaList
      })
      .catch((err) => {
        throw err
      })
  })
</script>

<template>
  <div class="media-player-container">
    <MediaPlayer v-if="media" :media="media" />
  </div>
</template>

<style scoped>
  .media-player-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
