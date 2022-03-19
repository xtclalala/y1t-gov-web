<template>
  <div>{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref<string>('登录页')
</script>

<style scoped></style>
