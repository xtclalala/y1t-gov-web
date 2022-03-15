<template>
  <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const msg = ref<string>('sys user')
</script>

<style scoped></style>
