import { h } from 'vue'
import { YIcon } from '@/components'

export const renderIcon = (icon: string) => {
  return () => h(YIcon, { iconType: icon })
}
