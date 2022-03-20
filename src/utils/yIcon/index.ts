import { h } from 'vue'
import YIcon from '@/components/yIcon/index.vue'

export const renderIcon = (icon: string | undefined) => {
  return () => {
    return h(YIcon, { type: icon })
  }
}
