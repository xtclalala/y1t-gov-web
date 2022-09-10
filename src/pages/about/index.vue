<script lang="ts">
export default {
  name: 'YAbout',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('about')
</script>
<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
