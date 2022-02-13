<script setup>
  import { onMounted, ref } from 'vue'
  const props = defineProps({
    images: { type: Array, default: null },
    videos: { type: Array, default: null },
  })

  const currentMediaType = ref(null)
  const currentMediaURL = ref(null)

  const setCurrentMedia = () => {
    const selectMediaArray = () =>
      Math.ceil(Math.random(0, 2)) > 0.5 ? props.images : props.videos
    const mediaArray = selectMediaArray()
    currentMediaURL.value =
      mediaArray[Math.floor(Math.random() * mediaArray.length)]
    const setCurrentMediaType = () => {
      const fileExt = currentMediaURL.value.match(/(?:\.([^.]+))?$/)
      if (
        fileExt === 'jpg' ||
        fileExt === 'jpeg' ||
        fileExt === 'png' ||
        fileExt === 'gif' ||
        fileExt === 'bmp' ||
        fileExt === 'webp'
      ) {
        return 'image'
      }
      return 'video'
    }

    currentMediaType.value = setCurrentMediaType()
  }

  onMounted(() => {
    setCurrentMedia()
  })
</script>

<template>
  <img v-if="currentMediaType === 'image'" :src="currentMediaURL" alt="" />
  <video v-else :src="currentMediaURL"><track kind="captions" /></video>
</template>

<style scoped>
  img {
    height: 100%;
  }

  video {
    height: 100%;
  }
</style>
