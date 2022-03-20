<template>
  <n-button text @click="refresh">
    <y-icon size="22" type="refresh" />
  </n-button>
</template>

<script setup lang="ts">
import { unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import YIcon from '@/components/yIcon/index.vue'
import { rPath } from '@/enums/rPath'

const router = useRouter()
const route = useRoute()

const refresh = () => {
  router.push({
    path: rPath.REDIRECT + unref(route).fullPath,
  })
}
</script>

<style scoped></style>
