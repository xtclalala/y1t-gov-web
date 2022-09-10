<script lang="ts">
export default {
  name: 'YContent',
}
</script>
<script lang="ts" setup>
import { useRouteStore } from '@/store/module/router'
const routeStore = useRouteStore()
</script>
<template>
  <n-layout-content
    embedded
    content-style="padding: 12px; min-height: 80vh"
    :native-scrollbar="false"
  >
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="routeStore.getCacheList">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </router-view>
  </n-layout-content>
</template>
