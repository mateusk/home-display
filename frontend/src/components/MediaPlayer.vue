<script setup>
  import { onMounted, ref } from 'vue'
  const props = defineProps({
    images: { type: Array, default: null },
    videos: { type: Array, default: null },
  })

  const currentMediaType = ref(null)
  const currentMediaURL = ref(null)
  const previousMediaType = ref(null)
  const previousMediaURL = ref(null)
  const isTranslating = ref(false)

  function setCurrentMedia() {
    const mediaArray = selectMediaArray()
    currentMediaURL.value =
      mediaArray[Math.floor(Math.random() * mediaArray.length)]

    console.log(currentMediaURL.value)

    currentMediaType.value = setCurrentMediaType()
  }

  function selectMediaArray() {
    return Math.ceil(Math.random(0, 2)) > 0.5 ? props.images : props.videos
  }

  function setCurrentMediaType() {
    const fileExt = currentMediaURL.value.match(/(?:\.([^.]+))?$/)[1]
    if (
      fileExt === 'jpg' ||
      fileExt === 'jpeg' ||
      fileExt === 'png' ||
      fileExt === 'gif' ||
      fileExt === 'bmp' ||
      fileExt === 'webp'
    ) {
      return 'image'
    } else return 'video'
  }

  onMounted(() => {
    setCurrentMedia()
    setTimeout(() => {
      isTranslating.value = true
    }, 500)

    setInterval(() => {
      isTranslating.value = false
      previousMediaURL.value = currentMediaURL.value
      previousMediaType.value = currentMediaType.value
      setCurrentMedia()
      setTimeout(() => {
        isTranslating.value = true
      }, 500)
    }, 20000)
  })
</script>

<template>
  <div class="media-container-overlay">
    <div v-if="previousMediaURL" class="previous-media-container">
      <img
        v-if="previousMediaType === 'image'"
        :src="previousMediaURL"
        alt=""
      />
      <video v-else>
        <source :src="previousMediaURL" />
        <track kind="captions" />
      </video>
    </div>
    <div class="current-media-container">
      <img
        v-if="currentMediaType === 'image'"
        :src="currentMediaURL"
        alt=""
        :class="{ translating: isTranslating, stopped: !isTranslating }"
      />
      <video v-else>
        <source :src="currentMediaURL" />
        <track kind="captions" />
      </video>
    </div>
  </div>
</template>

<style scoped>
  .media-container-overlay {
    display: grid;
    width: 100%;
    height: 100vh;
  }

  .current-media-container,
  .previous-media-container {
    display: flex;
    grid-area: 1 / 1;
    align-items: center;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
  }

  .current-media-container {
    z-index: 2;
  }

  .previous-media-container img,
  video {
    transform: translateX(-50%);
  }

  img,
  video {
    height: 100vh;
    aspect-ratio: auto;
    object-fit: cover;
  }

  .stopped {
    opacity: 0;
    transition: opacity 0s linear, transform 0s linear;
    transform: translateX(0);
  }

  .translating {
    opacity: 1;
    transition: opacity 1s linear, transform 20s ease-in-out;
    transform: translateX(-50%);
  }
</style>
