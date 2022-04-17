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
import { viewStore } from '@/store/module/views'
import { Menu } from '@r/types'
import { useRouteStore } from '@/store/module/router'

const router = useRouter()
const uRouter = useRouteStore()
const collapsed = ref<boolean>(false)
const route = useRoute()
const tabsView = viewStore()
const options = uRouter.getMenus
const expandedKeys = ref<string[]>([])

// 菜单跳转
const handleAlt = (key: string, item: Menu) => {
  tabsView.routerPush(item)
  router.push({ name: key })
}
</script>

<style scoped></style>
