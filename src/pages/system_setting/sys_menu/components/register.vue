<script setup lang="ts">
import { ref } from 'vue'
import { registerMenu } from '@/api/system_setting/types/sys_menu'
import { FormInst, FormRules } from 'naive-ui'
import { register } from '@/api/system_setting/sys_menu'

const showRegister = ref<boolean>(false)
const modalStyle = {
  width: '600px',
}
const form = ref<FormInst | null>(null)
const menuModel = ref<registerMenu>({
  name: '',
  title: '',
  path: '',
  hidden: false,
  hiddenNumber: '',
  component: '',
  icon: 'Earth',
  sort: 100,
  pid: 0,
})
const rules: FormRules = {
  title: {
    required: true,
    message: '请填写页面标题！',
    trigger: ['input', 'blur'],
  },
  name: {
    required: true,
    message: '请填写页面名称！',
    trigger: ['input', 'blur'],
  },
  path: {
    required: true,
    message: '请填写页面路径！',
    trigger: ['input', 'blur'],
  },
  component: {
    required: true,
    message: '请填写组件地址！',
    trigger: ['input', 'blur'],
  },
}
const emit = defineEmits(['success', 'fail'])

const handleChangeHidden = async (e: Event) => {
  menuModel.value.hidden = !!(e.target as HTMLInputElement).value
}
const handleRegister = async () => {
  showRegister.value = true
}
const submitCallback = async (e: MouseEvent) => {
  e.preventDefault()
  form.value
    ?.validate(async (errors) => {
      if (errors) {
        return
      }
      showRegister.value = false
      await register<string>(menuModel.value, { isMessage: true })
      menuModel.value = {
        name: '',
        title: '',
        path: '',
        hidden: false,
        hiddenNumber: '',
        component: '',
        icon: 'Earth',
        sort: 100,
        pid: 0,
      }
      emit('success')
    })
    .catch((e) => {
      console.log(e)
    })
}
const cancelCallback = async () => {
  showRegister.value = false
}
</script>

<template>
  <n-button type="info" @click="handleRegister">新增</n-button>
  <n-modal v-model:show="showRegister" title="新增" :style="modalStyle" preset="card">
    <n-form
      ref="form"
      :model="menuModel"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      label-width="auto"
    >
      <n-form-item label="页面标题" path="title">
        <n-input v-model:value="menuModel.title" placeholder="标题" />
      </n-form-item>
      <n-form-item label="页面名称" path="name">
        <n-input v-model:value="menuModel.name" placeholder="名称" />
      </n-form-item>
      <n-form-item label="页面路径" path="path">
        <n-input v-model:value="menuModel.path" placeholder="路径" />
      </n-form-item>
      <n-form-item label="图标" path="icon">
        <n-input v-model:value="menuModel.icon" placeholder="图标" />
      </n-form-item>
      <n-form-item label="组件地址" path="component">
        <n-input v-model:value="menuModel.component" placeholder="组件地址" />
      </n-form-item>
      <n-form-item label="是否隐藏" path="hiddenNumber">
        <n-radio-group
          v-model:value="menuModel.hiddenNumber"
          name="hiddenNumber"
          @change="handleChangeHidden"
        >
          <n-space :size="5">
            <n-radio value="1"> 是</n-radio>
            <n-radio value=""> 否</n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="排序" path="sort">
        <n-input-number v-model:value="menuModel.sort" placeholder="排序" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space :size="5" justify="end">
        <n-button type="tertiary" size="small" @click="cancelCallback"> 取消</n-button>
        <n-button type="success" size="small" @click="submitCallback"> 添加</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
