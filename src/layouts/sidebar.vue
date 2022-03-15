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
    <router-link to="/" #="{ navigate, href }" custom>
      <n-a class="logo" href="https://github.com/xtclalala/y1t-gov-web" @click="navigate">
        <svg viewBox="0 0 512 512">
          <path
            d="M256 233.37l34.45-34.45a207.08 207.08 0 0 1-50.12-135.25c0-5 .19-10.05.54-15A207.09 207.09 0 0 0 120.67 98z"
            fill="currentColor"
          ></path>
          <path
            d="M313.14 176.23L391.33 98A207.07 207.07 0 0 0 273 48.8c-.41 4.9-.64 9.86-.64 14.87a175.25 175.25 0 0 0 40.78 112.56z"
            fill="currentColor"
          ></path>
          <path
            d="M335.77 198.86a175.25 175.25 0 0 0 112.56 40.81c5 0 10-.23 14.87-.64A207.07 207.07 0 0 0 414 120.67z"
            fill="currentColor"
          ></path>
          <path
            d="M176.23 313.14a175.23 175.23 0 0 0-112.56-40.81q-7.52 0-14.87.64A207.07 207.07 0 0 0 98 391.33z"
            fill="currentColor"
          ></path>
          <path
            d="M256 278.63l-34.45 34.45a207.08 207.08 0 0 1 50.12 135.25c0 5-.19 10.05-.54 15A207.06 207.06 0 0 0 391.33 414z"
            fill="currentColor"
          ></path>
          <path
            d="M448.33 271.67a207.08 207.08 0 0 1-135.25-50.12L278.63 256L414 391.33a207.09 207.09 0 0 0 49.39-120.2c-5.01.35-10.02.54-15.06.54z"
            fill="currentColor"
          ></path>
          <path
            d="M233.37 256L98 120.67a207.06 207.06 0 0 0-49.39 120.2c5-.35 10-.54 15-.54a207.08 207.08 0 0 1 135.25 50.12z"
            fill="currentColor"
          ></path>
          <path
            d="M120.67 414A207.07 207.07 0 0 0 239 463.2q.63-7.35.64-14.87a175.23 175.23 0 0 0-40.81-112.56z"
            fill="currentColor"
          ></path>
        </svg>
        <span>y1t-gov</span>
      </n-a>
    </router-link>
    <n-menu
      :collapsed="collapsed"
      :default-expanded-keys="expandedKeys"
      :options="options"
      :indent="24"
      @update:value="handleAlt"
    />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Routes } from '@/router/routes'
import { router2menu } from '@/utils/menu'
import { MenuOption, useMessage } from 'naive-ui'
import { tabsViewStore } from '@/store/module/tabsViewStore'

const msg = useMessage()
const r = useRouter()
const collapsed = ref<boolean>(false)
const route = useRoute()
const tabsView = tabsViewStore()
const options = router2menu(Routes)
const currentKey = ref<string>(route.name as string)
const expandedKeys = ref<string[]>([])
const handleAlt = (key: string, item: MenuOption) => {
  currentKey.value = key
  r.push({ name: key })
  tabsView.currentView = key
  if (tabsView.findTab(item)) {
    return
  }
  tabsView.viewList.push(item)
}
</script>

<style scoped>
.logo {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  /* border-bottom: 1px solid var(--border-color); */
  background: var(--color);
  font-size: 1.8em;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition: padding 0.3s var(--bezier), font-size 0.3s var(--bezier);
}

.n-layout-sider--collapsed .logo {
  padding: 8px;
  font-size: 0;
}

.logo svg {
  flex: 0 0 32px;
  height: 32px;
  margin-right: 12px;
  transition: margin 0.3s var(--bezier);
}

.n-layout-sider--collapsed .logo svg {
  margin-right: 0;
}
</style>
