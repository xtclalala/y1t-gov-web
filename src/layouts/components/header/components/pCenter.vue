<template>
  <n-dropdown placement="bottom-end" show-arrow :options="options" @select="handleOptionsSelect">
    <n-avatar size="small" round src="#" />
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { renderIcon } from '@/utils/yIcon'
import { RouterLink, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { userStore } from '@/store/module/user'
import { rPath } from '@/enums/rPath'

const router = useRouter()
const message = useMessage()
const me = userStore()
// todo 拿到个人信息
// 选中下拉框中的回调
const handleOptionsSelect = async (key: unknown): Promise<void> => {
  if ((key as string) === 'me') {
    message.success(`Welcome back, ${me.name as string}!`)
  }
}

const options = computed(() => [
  { key: 'me', icon: renderIcon('Barcode'), label: `Hey, ${me.name as string}!` },
  { key: 'divider', type: 'divider' },
  // todo 个人中心
  {
    key: 'profile',
    icon: renderIcon('PeopleCircleOutline'),
    label: () => h(RouterLink, { to: '/user' }, { default: () => 'Your Profiles' }),
  },
  {
    key: 'settings',
    icon: renderIcon('SettingsOutline'),
    label: () => h(RouterLink, { to: '/role' }, { default: () => 'Settings' }),
  },
  { key: 'divider', type: 'divider' },
  {
    key: 'logout',
    icon: renderIcon('LogInOutline'),
    label: () => h(RouterLink, { to: rPath.LOGIN }, { default: () => 'Sign out' }),
  },
])
</script>

<style scoped></style>
