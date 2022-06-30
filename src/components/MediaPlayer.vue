<script setup>
  import { onMounted, ref } from 'vue'
  const props = defineProps({
    media: { type: Array, default: null },
  })

  const currentMediaType = ref(null)
  const currentMediaURL = ref(null)
  const previousMediaType = ref(null)
  const previousMediaURL = ref(null)
  const mediaContainer = ref(null)

  const transitionTime = 2000
  const mediaDisplayTime = 10000

  function setCurrentMedia() {
    let mediaPool = props.media

    if (previousMediaURL.value) {
      mediaPool = mediaPool.filter((media) => media !== previousMediaURL.value)
    }

    const randomIndex = Math.floor(Math.random() * mediaPool.length)
    console.log('random index: ' + randomIndex)
    currentMediaURL.value = mediaPool[randomIndex]

    console.log('currentMediaURL', currentMediaURL.value)

    currentMediaType.value = setCurrentMediaType()
  }

  function setCurrentMediaType() {
    const fileExt = currentMediaURL.value.match(/(?:\.([^.]+))?$/)[1]
    console.log('fileExt', fileExt)
    if (
      fileExt === 'jpg' ||
      fileExt === 'JPG' ||
      fileExt === 'jpeg' ||
      fileExt === 'JPG' ||
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

    prepareMedia()

    setTimeout(() => {
      setTranslatingClass(document.querySelector('#current-media'))
    }, transitionTime)

    setInterval(() => {
      previousMediaURL.value = currentMediaURL.value
      previousMediaType.value = currentMediaType.value

      // Preparing previous media for transition:
      document.querySelector('#current-media').id = 'previous-media'

      setCurrentMedia()

      prepareMedia()

      setTimeout(() => {
        setTranslatingClass(document.querySelector('#current-media'))
        setStoppedClass(document.querySelector('#previous-media'))
      }, transitionTime)

      setTimeout(() => {
        document.querySelector('#previous-media').remove()
      }, transitionTime * 2)
    }, mediaDisplayTime)
  })

  function prepareMedia() {
    if (currentMediaType.value === 'image') {
      const imageElement = createImageElement(currentMediaURL.value)
      setStoppedClass(imageElement)
      imageElement.id = 'current-media'

      mediaContainer.value.appendChild(imageElement)
    }

    if (currentMediaType.value === 'video') {
      const videoElement = createVideoElement(currentMediaURL.value)
      setStoppedClass(videoElement)
      videoElement.id = 'current-media'

      mediaContainer.value.appendChild(videoElement)
      videoElement.load()
    }
  }

  function createImageElement(src) {
    const imageElement = document.createElement('img')
    imageElement.src = src
    imageElement.style.height = '100vh'
    imageElement.style['aspect-ratio'] = 'auto'
    imageElement.style['object-fit'] = 'cover'
    imageElement.style.position = 'absolute'
    imageElement.style.left = 0
    imageElement.style.top = 0
    return imageElement
  }

  function createVideoElement(src) {
    const videoElement = document.createElement('video')
    videoElement.src = src
    videoElement.autoplay = true
    videoElement.muted = true
    videoElement.playsInline = true
    videoElement.style.height = '100vh'
    videoElement.style['aspect-ratio'] = 'auto'
    videoElement.style['object-fit'] = 'cover'
    videoElement.style.position = 'absolute'
    videoElement.style.left = 0
    videoElement.style.top = 0
    return videoElement
  }

  function setStoppedClass(element) {
    element.style.opacity = 0
    element.style['z-index'] = 1
  }

  function setTranslatingClass(element) {
    element.style.opacity = 1
    element.style.transition = `opacity ${
      transitionTime / 1000
    }s linear, transform ${mediaDisplayTime / 1000}s ease-in-out`
    element.style.transform = 'translateX(-50%)'
    element.style['z-index'] = 2
  }
</script>

<template>
  <div ref="mediaContainer" class="media-container"></div>
</template>

<style scoped>
  .media-container {
    width: 100%;
    height: 100vh;
  }
</style>
