<template>
  <n-modal :show="show">
    <n-card style="width: 400px" title="请选择活跃身份" footer-style="login-button-fixe">
      <div>
        <n-select
          v-model:value="currentRole"
          :style="{ width: '80%' }"
          :options="roles"
          :mask-closable="false"
        />
      </div>
      <template #action>
        <n-button style="float: right" @click="submitCallback">确定</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { userStore } from '@/store/module/user'
import { storeToRefs } from 'pinia'
import { RouteRecordRaw, useRouter } from 'vue-router'
import { useRouteStore } from '@/store/module/router'
import { PageEnum } from '@/enums/pageEnum'

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const { show } = toRefs(props)
const routeStore = useRouteStore()
const router = useRouter()
const emit = defineEmits(['update:show'])
const currentRole = ref(null)
const user = userStore()
const { roles } = storeToRefs(user)

const submitCallback = () => {
  if (currentRole.value === null) {
    window.$message?.warning('请选择身份')
    return
  }
  user.setCurrentRole(currentRole.value)
  routeStore.generateRoutes(user.getCurrentRole)

  router.addRoute(routeStore.addRouters as RouteRecordRaw)
  emit('update:show', false)
  router.push(PageEnum.BASE_HOME)
}
</script>

<style lang="sass" scoped></style>
