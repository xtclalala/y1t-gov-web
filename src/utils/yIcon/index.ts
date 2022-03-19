import { h } from 'vue'
import { yIcon } from '@/components/yIcon'

export const renderIcon = (icon: string | undefined) => {
  return () => {
    return h(yIcon, { type: icon })
  }
}
