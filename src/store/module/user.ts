import { defineStore } from 'pinia'
import { Information, IOrg, IRole, LoginParams } from '@/api/common/model/login'
import { doLogin, getInformation } from '@/api/common/login'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { CURRENT_ROLE, ORGANIZATIONS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO } from '@/enums/cacheEnum'

import { IRoleSelect, roles2Select } from '@/utils/yRoles'
import { store } from '@/store'

interface IUser {
  username: string
  token: string
  currentRole: IRoleSelect | undefined
  roles: IRoleSelect[] | undefined
  organization: IOrg[] | undefined
}

export const userStore = defineStore('user', {
  state: (): IUser => {
    return {
      username: 'test',
      token: '',
      // ...各种字段，
      currentRole: undefined,
      roles: undefined,
      organization: undefined,
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
      return this.roles || getAuthCache<IRoleSelect[]>(ROLES_KEY)
    },
    getOrganization(): IOrg[] {
      return this.organization || getAuthCache<IOrg[]>(ORGANIZATIONS_KEY)
    },
    getUsername(): string {
      return this.username || getAuthCache<string>(USER_INFO)
    },
  },
  actions: {
    login: async function (params: LoginParams): Promise<boolean> {
      const token = await doLogin<string>(params)
      if (token === undefined) {
        return false
      }
      this.setToken(token)
      const { username, roles, orgs } = await getInformation<Information>({ isMessage: false })
      this.setUsername(username)
      this.setOrganizations(orgs)
      this.setRoles(roles)
      return true
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
    setOrganizations(organization: IOrg[]) {
      this.organization = organization
      setAuthCache(ORGANIZATIONS_KEY, organization)
    },
    setUsername(username: string) {
      this.username = username
      setAuthCache(USER_INFO, username)
    },
    setCurrentRole(value: number | null) {
      const c = this.roles?.find((self) => self.value === value)
      this.currentRole = c
      setAuthCache(CURRENT_ROLE, c)
    },
  },
})

export function userStoreWidthOut() {
  return userStore(store)
}
