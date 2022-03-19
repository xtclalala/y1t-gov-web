<template>
  <n-layout-sider
    bordered
    :width="220"
    :collapsed="collapsed"
    :native-scrollbar="false"
    collapse-mode="width"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <loge />
    <n-menu
      :value="tabsView.currentView"
      :collapsed="collapsed"
      :default-expanded-keys="expandedKeys"
      :options="options"
      :indent="24"
      @update:value="handleAlt"
    />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import Loge from './components/logo.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Routes } from '@r/routes'
import { router2menu } from '@/utils/yMenu'
import { useMessage } from 'naive-ui'
import { tabsViewStore } from '@/store/module/tabsViewStore'
import { AppRouteRecordRaw } from '@r/types'

const msg = useMessage()
const router = useRouter()
const collapsed = ref<boolean>(false)
const route = useRoute()
const tabsView = tabsViewStore()
const options = router2menu(Routes)

const expandedKeys = ref<string[]>([])
const handleAlt = (key: string, item: AppRouteRecordRaw) => {
  tabsView.routerPush(item)
  router.push({ name: key })
}
</script>

<style scoped></style>
