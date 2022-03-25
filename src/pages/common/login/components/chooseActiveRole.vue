<template>
  <n-button @click="showModal = true"> 来吧 </n-button>
  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="请选择活跃身份" footer-style="login-button-fixe">
      <div>
        <n-select :style="{ width: '50%' }" :options="selectOptions" />
      </div>
      <template #action>
        <n-button style="float: right" @click="submitCallback">确定</n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref<boolean>(false)
const submitCallback = () => {
  console.log('test')
  showModal.value = false
}
// todo 选择活跃身份后 去请求路由 并添加路由
const selectOptions = ref([
  {
    label: 'test1', // 显示
    value: 'test2', // 值
  },
])
</script>

<style lang="sass" scoped></style>
