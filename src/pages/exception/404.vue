<script lang="ts">
export default {
  name: 'YNotFound',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('not found 404')
</script>
<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
