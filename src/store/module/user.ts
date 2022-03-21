import { defineStore } from 'pinia'
import { LoginParams, LoginResponse } from '@/api/common/model/login'
import { doLogin } from '@/api/common/login'

export const userStore = defineStore('user', {
  state: () => {
    return {
      username: 'test',
      // ...各种字段，
      roles: [],
      organization: [],
      permissions: [],
    }
  },
  actions: {
    login: async (params: LoginParams) => {
      return doLogin<LoginResponse>(params)
    },
  },
})
