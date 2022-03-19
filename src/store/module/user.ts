import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      name: 'test',
      // ...各种字段，
      roles: [],
      organization: [],
      permissions: [],
    }
  },
})
