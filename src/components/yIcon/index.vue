<template>
  <n-icon v-bind="props" :component="vIcons[props.iconType]" />
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import * as vIcons from '@vicons/ionicons5'
const props = defineProps({
  ...NIcon.props,
  iconType: {
    type: String,
    default: 'fallback',
  },
})
</script>
