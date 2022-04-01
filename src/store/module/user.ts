import { defineStore } from 'pinia'
import { Information, IRole, LoginParams, LoginResponse } from '@/api/common/model/login'
import { doLogin, getInformation } from '@/api/common/login'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import {
  CURRENT_ROLE,
  ORGANIZATIONS_KEY,
  PERMISSIONS_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO,
} from '@/enums/cacheEnum'
import { AppRouteRecordRaw } from '@r/types'
import { useAppStoreWithOut } from '@/store/module/app'
import { PermissionModeEnum } from '@/enums/appEnum'
import { IRoleSelect, roles2Select } from '@/utils/yRoles'

interface IUser {
  username: string
  token: string
  // todo 改成 role 接口
  currentRole: IRoleSelect | undefined
  roles: IRoleSelect[]
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
      currentRole: {
        name: '',
        id: '',
        label: '',
        value: '',
      },
      roles: [
        { name: 't1', id: 't1', label: 't1', value: 't1' },
        { name: 't2', id: 't2', label: 't2', value: 't2' },
      ],
      organization: [],
      permissions: [],
      router: [],
    }
  },
  getters: {
    getCurrentRole(): IRoleSelect {
      return this.currentRole || getAuthCache<IRoleSelect>(CURRENT_ROLE)
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoles(): IRoleSelect[] {
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
    },
    setToken(token: string) {
      this.token = token
      setAuthCache(TOKEN_KEY, token)
    },
    setRoles(roles: IRole[]) {
      const s = roles2Select(roles)
      this.roles = s
      setAuthCache(ROLES_KEY, s)
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
    setCurrentRole(value: string | null) {
      const c = this.roles.find((self) => self.value === value)
      this.currentRole = c
      setAuthCache(CURRENT_ROLE, c)
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
