<template>
  <n-button text @click="refresh">
    <y-icon size="22" type="refresh" />
  </n-button>
</template>

<script setup lang="ts">
import { unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { yIcon } from '@/components/yIcon'

const router = useRouter()
const route = useRoute()

const refresh = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath,
  })
}
</script>

<style scoped></style>
