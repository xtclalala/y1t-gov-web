import { isDevMode } from '@/utils/env'
import { Options } from '@/hooks/useModal/type'

export const options: Options = {
  key: 'default',
  register: {
    fn: async (_) => {
      const dev = isDevMode()
      if (dev) {
        throw new Error('useModal options register.api can not empty')
      }
    },
    after: async (show, _) => {
      show.value = false
    },
  },
  update: {
    fn: async (_) => {
      const dev = isDevMode()
      if (dev) {
        throw new Error('useModal options update.api can not empty')
      }
    },
    after: async (show, _) => {
      show.value = false
    },
  },
  modelObject: {},
  style: {},
}
