<script setup lang="ts">
import { ref } from 'vue'
const msg = ref<string>('center')
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
