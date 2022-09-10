<script lang="ts">
export default {
  name: 'YNotify',
}
</script>
<script setup lang="ts">
import { useComponentsAsyncComponent } from '@/hooks/useAsyncComponent/useAsyncComponent'
import { ref } from 'vue'
import { isEmpty } from '@/utils/is'

const YIcon = useComponentsAsyncComponent('YIcon')

const paneStyle = { width: '80px', height: '160px' }
const notifyList = ref([])
const msgList = ref([])
</script>
<template>
  <n-popover trigger="click" placement="bottom-end" :width="300">
    <template #trigger>
      <n-badge dot processing>
        <y-icon :size="22" icon-type="NotificationsCircle" :depth="2" />
      </n-badge>
    </template>
    <n-tabs
      type="line"
      justify-content="space-evenly"
      style="--pane-padding: 0"
      :pane-style="paneStyle"
    >
      <n-tab-pane name="notifications" tab="通知">
        <n-list v-if="!isEmpty(notifyList)" style="margin: 0">
          <n-list-item v-for="i in 8" :key="i">No {{ i }}</n-list-item>
        </n-list>
        <n-empty v-else description="暂无内容" />
      </n-tab-pane>
      <n-tab-pane name="message" tab="消息">
        <n-list v-if="!isEmpty(msgList)" style="margin: 0">
          <n-list-item v-for="i in 8" :key="i">No {{ i }}</n-list-item>
        </n-list>
        <n-empty v-else description="暂无内容" />
      </n-tab-pane>
    </n-tabs>
  </n-popover>
</template>
<style scoped></style>
