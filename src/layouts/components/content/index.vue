<template>
  <n-layout-content
    embedded
    content-style="padding: 12px; min-height: 80vh; background-color:#F2F3F4"
  >
    <n-layout :native-scrollbar="false">
      <router-view v-slot="{ Component, route }">
        <!--      todo 添加缓存配置 使用的组件需要有 name属性-->
        <keep-alive :include="rs.getCachelist">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </router-view>
    </n-layout>
  </n-layout-content>
</template>
<script lang="ts" setup>
import { useRouteStore } from '@/store/module/router'

const rs = useRouteStore()
</script>
