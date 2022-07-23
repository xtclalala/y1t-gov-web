import { defineStore } from 'pinia'
import { store } from '@/store'
import { AfterBusinessRoutes } from '@r/index'
// import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { PermissionModeEnum } from '@/enums/appEnum'
import { addMeta, renderMenuIcon, router2menuDeep } from '@/utils/yMenu'
import { AppRouteRecordRaw, Menu } from '@r/types'
import { buildMenusTree } from '@/utils/yRouter/router'
import projectSetting from '@/settings/projectSetting'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { CACHELIST_CACHE_KEY, MENU_CACHE_KEY, WHITELIST_CACHE_KEY } from '@/enums/cacheEnum'
import { useUserStore } from '@/store/module/user'
import { treeToList } from '@/utils/helper/treeHelper'

export interface IAsyncRouteState {
  menus: Menu[] | undefined
  whitelist: string[] | undefined
  cacheList: string[]
  isDynamicAddedRoute: boolean | undefined
}

export const useRouteStore = defineStore({
  id: 'route',
  state: (): IAsyncRouteState => ({
    menus: undefined,
    whitelist: undefined,
    cacheList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: undefined,
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus || renderMenuIcon(getAuthCache<Menu[]>(MENU_CACHE_KEY))
    },
    getWhitelist(): string[] {
      return this.whitelist || getAuthCache<string[]>(WHITELIST_CACHE_KEY)
    },
    getCacheList(): string[] {
      return this.cacheList || getAuthCache<string[]>(CACHELIST_CACHE_KEY)
    },
    getIsDynamicAddedRoute(): boolean {
      if (this.isDynamicAddedRoute === undefined) {
        const { permissionMode } = projectSetting
        switch (permissionMode) {
          case PermissionModeEnum.BACK:
          case PermissionModeEnum.ROLE:
            this.isDynamicAddedRoute = true
            break
          case PermissionModeEnum.ROUTE_MAPPING:
            this.isDynamicAddedRoute = false
            break
          default:
            this.isDynamicAddedRoute = undefined
        }
      }
      return this.isDynamicAddedRoute || false
    },
  },
  actions: {
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },

    // 设置菜单
    setMenus(menus: Menu[]) {
      setAuthCache(MENU_CACHE_KEY, menus)
      this.menus = renderMenuIcon(menus)
    },
    // 设置白名单
    setCacheList(menus: Menu[]) {
      // const w: Menu[] = tree2list<Menu>(menus)
      const w: Menu[] = treeToList<Menu[]>(menus, { children: 'children' })
      const whitelist = w.flatMap((self) => self.name)
      const cacheList = w
        .filter((self) => self.keepAlive)
        .flatMap((self) => self.name)
        .concat('About')
      this.whitelist = whitelist
      this.cacheList = cacheList
      setAuthCache(WHITELIST_CACHE_KEY, whitelist)
      setAuthCache(CACHELIST_CACHE_KEY, cacheList)
    },
    // 生成菜单
    async generateMenus() {
      let buildMenus: Menu[] = []
      const { permissionMode } = projectSetting
      switch (permissionMode) {
        case PermissionModeEnum.BACK: {
          this.setDynamicAddedRoute(true)
          const user = useUserStore()
          let menus = user.getCurrentRole.menus
          this.setCacheList(menus)
          menus = buildMenusTree(menus)
          buildMenus.push(...menus)
          break
        }
        case PermissionModeEnum.ROUTE_MAPPING:
        default: {
          this.setDynamicAddedRoute(false)
        }
      }
      this.setMenus(buildMenus)
      return
    },
    // 生成路由
    async generateRoute(): Promise<AppRouteRecordRaw[]> {
      let buildRoute: AppRouteRecordRaw[]
      const { permissionMode } = projectSetting
      switch (permissionMode) {
        case PermissionModeEnum.BACK: {
          this.setDynamicAddedRoute(true)
          buildRoute = addMeta(this.getMenus)
          break
        }
        case PermissionModeEnum.ROUTE_MAPPING:
        default: {
          this.setDynamicAddedRoute(false)
          buildRoute = AfterBusinessRoutes
          const menus = router2menuDeep(buildRoute)
          this.setMenus(menus)
        }
      }
      return buildRoute
    },
  },
})

// Need to be used outside the setup
export function useRouteStoreWidthOut() {
  return useRouteStore(store)
}
