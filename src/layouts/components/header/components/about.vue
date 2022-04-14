<template>
  <n-tooltip>
    <template #trigger>
      <router-link :to="{ name: rName.ABOUT }">
        <y-icon :size="22" type="help" :depth="2" />
      </router-link>
    </template>
    about me
  </n-tooltip>
</template>

<script setup lang="ts">
import YIcon from '@/components/yIcon/index.vue'
import { rName } from '@/enums/rName'
</script>

<style scoped></style>
