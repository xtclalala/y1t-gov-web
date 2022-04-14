<template>
  <n-h1 style="--font-size: 60px; --font-weight: 100"> 这是什么 </n-h1>
  <n-card size="large" style="--padding-bottom: 30px">
    <n-h2 style="--font-weight: 400">Sign-in</n-h2>
    <n-form size="large" :rules="rules" :model="model">
      <n-form-item-row label="Username" path="username">
        <n-input v-model:value="model.username" :placeholder="rules.username.placeholder" />
      </n-form-item-row>
      <n-form-item-row label="Password" path="password">
        <n-input
          v-model:value="model.password"
          type="password"
          :placeholder="rules.password.placeholder"
        />
      </n-form-item-row>
    </n-form>
    <n-button
      type="primary"
      size="large"
      block
      :loading="loading"
      :disabled="disabled"
      @click="handleLogin"
      >Sign in</n-button
    >
    <br />
    <choose-active-role v-model:show="show" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { userStore } from '@/store/module/user'
import { LoginParams } from '@/api/common/model/login'
import ChooseActiveRole from './components/chooseActiveRole.vue'
import { PageEnum } from '@/enums/pageEnum'

const router = useRouter()
const message = useMessage()
const user = userStore()
const rules = {
  username: {
    required: true,
    message: 'Username is required.',
    trigger: 'blur',
    placeholder: 'Input your username',
  },
  password: {
    required: true,
    message: 'Password is required.',
    trigger: 'blur',
    placeholder: 'Input your password',
  },
}
const show = ref<boolean>(false)
const model = ref<LoginParams>({
  username: 'admin11',
  password: '123456',
})
const loading = ref(false)

const disabled = computed<boolean>(() => model.value.username === '' || model.value.password === '')

const handleLogin = async (e: Event): Promise<void> => {
  e.preventDefault()
  loading.value = true
  try {
    show.value = await user.login(model.value)
  } catch (e) {
    message.error(e instanceof Error ? e.message : 'unknown error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.n-h1 {
  margin: 20vh auto 20px;
  text-align: center;
  letter-spacing: 5px;
  opacity: 0.8;
}

.n-card {
  margin: 0 auto;
  max-width: 380px;
  box-shadow: var(--box-shadow);
}
</style>
