<template>
  <n-layout-header bordered>
    <n-button text @click="reFlush">
      <n-icon size="22" :component="ReIcon" />
    </n-button>
    <!--    <n-breadcrumb>-->
    <!--      <n-breadcrumb-item>Dashboard</n-breadcrumb-item>-->
    <!--      <n-breadcrumb-item>Home</n-breadcrumb-item>-->
    <!--    </n-breadcrumb>-->
    <n-space :size="20" align="center" style="line-height: 1">
      <n-tooltip>
        <template #trigger>
          <router-link to="#">
            <n-icon size="22" :component="HelpIcon" />
          </router-link>
        </template>
        about me
      </n-tooltip>
      <n-tooltip>
        <template #trigger>
          <a href="https://github.com/xtclalala/y1t-gov-web" target="_blank">
            <n-icon size="22" :component="GitIcon" />
          </a>
        </template>
        View on github
      </n-tooltip>
      <n-popover trigger="click" placement="bottom-end" :width="300">
        <template #trigger>
          <!--          todo 可能要用tsx去加载-->
          <n-badge dot processing>
            <n-icon size="22" :component="NotificationsIcon" />
          </n-badge>
        </template>
        <n-tabs type="line" justify-content="space-evenly" style="--pane-padding: 0">
          <!--            todo 没有消息时显示空数据 有数据时固定高度-->
          <n-tab-pane name="notifications" tab="notifications（5）">
            <n-list style="margin: 0">
              <n-list-item v-for="i in 5" :key="i">No {{ i }}</n-list-item>
            </n-list>
          </n-tab-pane>
          <n-tab-pane name="message" tab="messages（5）">
            <n-list style="margin: 0">
              <n-list-item v-for="i in 5" :key="i">msg {{ i }}</n-list-item>
            </n-list>
          </n-tab-pane>
        </n-tabs>
      </n-popover>
      <n-dropdown
        placement="bottom-end"
        show-arrow
        :options="options"
        @select="handleOptionsSelect"
      >
        <n-avatar size="small" round src="#" />
      </n-dropdown>
    </n-space>
  </n-layout-header>
</template>

<script lang="ts" setup>
import { h, computed, Component, unref } from 'vue'
import { useMessage, NIcon } from 'naive-ui'
import { useRouter, RouterLink, useRoute } from 'vue-router'
import {
  PersonCircleOutline as UserIcon,
  SettingsOutline as SetIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  RefreshOutline as ReIcon,
  HelpCircleOutline as HelpIcon,
  LogoGithub as GitIcon,
  NotificationsCircle as NotificationsIcon,
} from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()
const message = useMessage()
// const { data: me } = useCurrentUser()
const me = { value: { name: 'test' } }

const reFlush = () => {
  console.log(unref(route).fullPath)
  router.push({
    path: '/redirect' + unref(route).fullPath,
  })
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

const options = computed(() => [
  { key: 'me', icon: renderIcon(UserIcon), label: `Hey, ${me.value?.name as string}!` },
  { key: 'divider', type: 'divider' },
  {
    key: 'profile',
    icon: renderIcon(SetIcon),
    label: () => h(RouterLink, { to: '/user' }, 'Your Profiles'),
  },
  {
    key: 'settings',
    icon: renderIcon(EditIcon),
    label: () => h(RouterLink, { to: '/role' }, 'Settings'),
  },
  { key: 'divider', type: 'divider' },
  { key: 'logout', icon: renderIcon(LogoutIcon), label: 'Sign out' },
])

// 选中下拉框中的回调
const handleOptionsSelect = async (key: unknown): Promise<void> => {
  if ((key as string) === 'logout') {
    // await token.revoke()
    await router.push({ name: 'menu' })
  } else if ((key as string) === 'me') {
    message.success(`Welcome back, ${me.value?.name as string}!`)
  }
}
</script>

<style scoped>
.n-layout-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 9px 18px;
}

.n-button {
  margin-right: 15px;
}

.n-space {
  margin-left: auto;
}
</style>
