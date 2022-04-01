<template>
  <n-button @click="showModal = true"> 来吧 </n-button>
  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="请选择活跃身份" footer-style="login-button-fixe">
      <div>
        <n-select v-model:value="currentRole" :style="{ width: '50%' }" :options="roles" />
      </div>
      <template #action>
        <n-button style="float: right" @click="submitCallback">确定</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '@/store/module/user'
import { storeToRefs } from 'pinia'

const showModal = ref<boolean>(false)
const submitCallback = () => {
  use.setCurrentRole(currentRole.value)
  showModal.value = false
}
const currentRole = ref(null)
// todo 选择活跃身份后 去请求路由 并添加路由
const use = userStore()
const { roles } = storeToRefs(use)
</script>

<style lang="sass" scoped></style>
