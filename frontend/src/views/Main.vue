<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import MediaPlayer from '../components/MediaPlayer.vue'

  const route = useRoute()

  const images = [
    '/assets/images/becodaspalavras_03.jpeg',
    '/assets/images/davidbowie-4.jpeg',
    '/assets/images/inspark_19-1547054190.jpeg',
    '/assets/images/inspark1.jpeg',
    '/assets/images/MdAJogo2.jpeg',
  ]

  const videos = ['/assets/videos/feriasvictoria.mp4']
</script>

<template>
  <div class="media-player-container">
    <MediaPlayer :images="images" :videos="videos" />
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
