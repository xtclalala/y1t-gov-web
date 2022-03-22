import { defineStore } from 'pinia'
import { Information, LoginParams, LoginResponse } from '@/api/common/model/login'
import { doLogin, getInformation } from '@/api/common/login'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import {
  ORGANIZATIONS_KEY,
  PERMISSIONS_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO,
} from '@/enums/cacheEnum'
import { AppRouteRecordRaw } from '@r/types'
import { useAppStoreWithOut } from '@/store/module/app'
import { PermissionModeEnum } from '@/enums/appEnum'

interface IUser {
  username: string
  token: string
  roles: []
  organization: []
  permissions: []
  router: AppRouteRecordRaw[]
}

export const userStore = defineStore('user', {
  state: (): IUser => {
    return {
      username: 'test',
      token: '',
      // ...各种字段，
      roles: [],
      organization: [],
      permissions: [],
      router: [],
    }
  },
  getters: {
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoles(): [] {
      return this.roles || getAuthCache(ROLES_KEY)
    },
    getOrganization(): [] {
      return this.organization || getAuthCache(ORGANIZATIONS_KEY)
    },
    getPermissions(): [] {
      return this.permissions || getAuthCache(PERMISSIONS_KEY)
    },
    getUsername(): string {
      return this.username || getAuthCache<string>(USER_INFO)
    },
  },
  actions: {
    async login(params: LoginParams) {
      const { token } = await doLogin<LoginResponse>(params)
      this.setToken(token)
      const { username, roles, organization, permissions } = await getInformation<Information>()
      this.setUsername(username)
      this.setPermissions(permissions)
      this.setOrganizations(organization)
      this.setRoles(roles)
      this.setRouter()
    },
    setToken(token: string) {
      this.token = token
      setAuthCache(TOKEN_KEY, token)
    },
    setRoles(roles: []) {
      this.roles = roles
      setAuthCache(ROLES_KEY, roles)
    },
    setOrganizations(organization: []) {
      this.organization = organization
      setAuthCache(ORGANIZATIONS_KEY, organization)
    },
    setPermissions(permissions: []) {
      this.permissions = permissions
      setAuthCache(PERMISSIONS_KEY, permissions)
    },
    setUsername(username: string) {
      this.username = username
      setAuthCache(USER_INFO, username)
    },
    setRouter: function () {
      const appStore = useAppStoreWithOut()
      const { permissionMode } = appStore.getProjectConfig
      switch (permissionMode) {
        case PermissionModeEnum.BACK:
          break
        case PermissionModeEnum.ROLE:
          break
        case PermissionModeEnum.ROUTE_MAPPING:
          break
        default:
          break
      }
    },
  },
})
