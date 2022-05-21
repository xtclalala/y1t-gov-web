import { h } from 'vue'
import YIcon from '@/components/yIcon/index.vue'

export const renderIcon = (icon: string) => {
  return () => h(YIcon, { iconType: icon })
}
