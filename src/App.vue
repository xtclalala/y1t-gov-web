<template>
  <n-config-provider :theme="theme" :locale="zhCN">
    <n-global-style />
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <naive-provider-content />
            <RouterView />
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed, defineComponent, h } from 'vue'
import { useOsTheme, darkTheme, zhCN, lightTheme } from 'naive-ui'
import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'
import { useAppStore } from '@/store/module/app'

function registerNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  setup() {
    registerNaiveTools()
  },
  render() {
    return h('div')
  },
})

const app = useAppStore()
const osTheme = useOsTheme()
const theme = computed(() => (osTheme.value === app.getDarkMode ? darkTheme : lightTheme))
</script>
