<script lang="ts">
export default {
  name: 'YCenter',
}
</script>
<script setup lang="ts">
import { renderIcon } from '@/utils/render'
import { RouterLink, useRouter } from 'vue-router'
import { NButton, useMessage } from 'naive-ui'
import { useUserStore } from '@/store/module/user'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
import { useAppStore } from '@/store/module/app'
import { computed, h, onMounted, ref } from 'vue'
import { useRouteStore } from '@/store/module/router'
import { useComponentsAsyncComponent } from '@/hooks/useAsyncComponent/useAsyncComponent'

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()
const routeStore = useRouteStore()

// 选中下拉框中的回调
const handleOptionsSelect = async (key: unknown): Promise<void> => {
  if ((key as string) === 'me') {
    message.success(`Welcome back, ${userStore.username as string}!`)
  }
}

// 退出登录
const logout = async () => {
  await useAppStore().clearOtherStore()
  await router.push({ name: rName.LOGIN })
}

const options = computed(() => {
  const op: Array<any> = [
    { key: 'me', icon: renderIcon('Barcode'), label: `Hey, ${userStore.username as string}!` },
    { key: 'divider', type: 'divider' },
  ]
  if (routeStore.getIsDynamicAddedRoute) {
    const ChooseActiveRole = useComponentsAsyncComponent('ChooseActiveRole')
    const chooseRoleRef = ref<InstanceType<typeof ChooseActiveRole> | null>(null)
    let openChoose
    onMounted(() => {
      openChoose = () => {
        chooseRoleRef.value && chooseRoleRef.value.open()
      }
    })
    op.push(
      ...[
        {
          key: 'me',
          icon: renderIcon('Barcode'),
          label: () =>
            h(ChooseActiveRole, {
              ref: 'chooseActiveRoleRef',
              onClick: () => openChoose && openChoose(),
            }),
        },
        { key: 'divider', type: 'divider' },
      ]
    )
  }
  return [
    ...op,
    {
      key: 'profile',
      icon: renderIcon('PeopleCircleOutline'),
      label: () => h(RouterLink, { to: rPath.CENTER }, { default: () => 'Your Settings' }),
    },
    { key: 'divider', type: 'divider' },
    {
      key: 'logout',
      icon: renderIcon('LogInOutline'),
      label: () =>
        h(NButton, { text: true, onClick: () => logout() }, { default: () => 'Sign out' }),
    },
  ]
})
</script>
<template>
  <n-dropdown placement="bottom-end" show-arrow :options="options" @select="handleOptionsSelect">
    <n-avatar size="small" round src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
  </n-dropdown>
</template>

<style scoped></style>
