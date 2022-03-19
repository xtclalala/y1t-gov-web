<template>
  <n-breadcrumb>
    <n-breadcrumb-item>{{ tabsStore.currentView }}</n-breadcrumb-item>
    <!--          <n-breadcrumb-item>Home</n-breadcrumb-item>-->
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { tabsViewStore } from '@/store/module/tabsViewStore'

const tabsStore = tabsViewStore()
</script>

<style scoped></style>
