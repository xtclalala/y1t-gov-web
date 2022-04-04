<template>
  <n-breadcrumb>
    <n-breadcrumb-item>{{ tabsStore.currentView }}</n-breadcrumb-item>
    <!--          <n-breadcrumb-item>Home</n-breadcrumb-item>-->
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { viewStore } from '@/store/module/views'

const tabsStore = viewStore()
</script>

<style scoped></style>
