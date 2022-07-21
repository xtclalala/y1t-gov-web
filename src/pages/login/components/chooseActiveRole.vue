<script lang="ts">
export default {
  name: 'ChooseActiveRole',
}
</script>
<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useUserStore } from '@/store/module/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/store/module/router'
import { PageEnum } from '@/enums/pageEnum'

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
})
const { show } = toRefs(props)
const emit = defineEmits(['update:show'])

const router = useRouter()
const currentRole = ref(null)
const userStores = useUserStore()
const { roles } = storeToRefs(userStores)
const routeStore = useRouteStore()
// 选择活跃身份
const submitCallback = async () => {
  if (currentRole.value === null) {
    window.$message?.warning('请选择身份')
    return
  }
  userStores.setCurrentRole(currentRole.value)
  await routeStore.generateMenus()
  emit('update:show', false)
  router.push(PageEnum.BASE_HOME)
}
</script>
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
<style lang="sass" scoped></style>
