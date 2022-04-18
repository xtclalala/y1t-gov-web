<template>
  <h1>{{ msg }}</h1>
  <helloWorld msg="ceshi" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

const msg = ref<string>('about')
</script>

<style scoped></style>
