<script lang="ts">
export default {
  name: 'YCenter',
}
</script>
<script setup lang="ts">
import { computed, h } from 'vue'
import { renderIcon } from '@/utils/yIcon'
import { RouterLink, useRouter } from 'vue-router'
import { NButton, useMessage } from 'naive-ui'
import { userStore } from '@/store/module/user'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
import { useRouteStore } from '@/store/module/router'
import { useViewStore } from '@/store/module/views'

const router = useRouter()
const message = useMessage()
const userStores = userStore()
const routeStore = useRouteStore()
const viewStore = useViewStore()
// 选中下拉框中的回调
const handleOptionsSelect = async (key: unknown): Promise<void> => {
  if ((key as string) === 'me') {
    message.success(`Welcome back, ${userStores.username as string}!`)
  }
}

// 退出登录
const logout = () => {
  userStores.$reset()
  routeStore.$reset()
  viewStore.$reset()
  router.push({ name: rName.LOGIN })
}

const options = computed(() => [
  { key: 'me', icon: renderIcon('Barcode'), label: `Hey, ${userStores.username as string}!` },
  { key: 'divider', type: 'divider' },
  // todo 权限模式切换身份
  // 修改密码
  // todo 个人中心
  {
    key: 'profile',
    icon: renderIcon('PeopleCircleOutline'),
    label: () => h(RouterLink, { to: rPath.CENTER }, { default: () => 'Your Profiles' }),
  },
  {
    key: 'logout',
    icon: renderIcon('LogInOutline'),
    label: () => h(NButton, { text: true, onClick: () => logout() }, { default: () => 'Sign out' }),
  },
])
</script>
<template>
  <n-dropdown placement="bottom-end" show-arrow :options="options" @select="handleOptionsSelect">
    <n-avatar size="small" round src="#" />
  </n-dropdown>
</template>

<style scoped></style>
