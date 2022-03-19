<template>
  <n-tooltip>
    <template #trigger>
      <router-link :to="rPath.ABOUT">
        <y-icon size="22" type="help" />
      </router-link>
    </template>
    about me
  </n-tooltip>
</template>

<script setup lang="ts">
import { yIcon } from '@/components/yIcon'
import { rPath } from '@r/enums/rPath'
</script>

<style scoped></style>
