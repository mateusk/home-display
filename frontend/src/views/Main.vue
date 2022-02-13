<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<template>
  <div class="view-container"></div>
</template>

<style scoped>
  .view-container {
    display: flex;
    flex-direction: column;
    gap: var(--gutter);
    align-items: center;
    justify-content: center;
  }
</style>
