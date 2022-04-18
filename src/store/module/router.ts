import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { BusinessRoutes } from '@r/index'

// import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { PermissionModeEnum } from '@/enums/appEnum'
import { addMeta, router2menuDeep } from '@/utils/yMenu'
import { AppRouteRecordRaw, Menu } from '@r/types'
import { payloadRoute, tree2list } from '@/utils/yRouter/router'
import projectSetting from '@/settings/projectSetting'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { MENU_CACHE_KEY, WHITELIST_CACHE_KEY } from '@/enums/cacheEnum'
import { userStore } from '@/store/module/user'

export interface IAsyncRouteState {
  menus: Menu[] | undefined
  whitelist: Menu[] | undefined
  isDynamicAddedRoute: boolean | undefined
}

export const useRouteStore = defineStore({
  id: 'route',
  state: (): IAsyncRouteState => ({
    menus: undefined,
    whitelist: undefined,
    // Whether the route has been dynamically added
    isDynamicAddedRoute: undefined,
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus || getAuthCache<Menu[]>(MENU_CACHE_KEY)
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

    // 设置动态路由
    setMenus(menus: Menu[]) {
      this.menus = menus
      setAuthCache(MENU_CACHE_KEY, menus)
    },

    // 设置白名单
    setWhitelist(menus: Menu[]) {
      const w: Menu[] = tree2list<Menu>(menus)
      this.whitelist = w
      setAuthCache(WHITELIST_CACHE_KEY, w)
    },

    // 生成菜单
    async generateMenus() {
      let accessedMenus: AppRouteRecordRaw[] = []

      const { permissionMode } = projectSetting
      switch (permissionMode) {
        case PermissionModeEnum.BACK: {
          this.setDynamicAddedRoute(true)
          const user = userStore()
          let menus = user.getCurrentRole.menus
          menus = payloadRoute(toRaw(menus))
          accessedMenus = toRaw(addMeta(menus))
          break
        }
        // case PermissionModeEnum.ROLE:
        //   const routeFilter = (route) => {
        //     const { meta } = route
        //     const { permissions } = meta || {}
        //     if (!permissions) {
        //       return true
        //     }
        //     return permissionsList.some((item) => permissions.includes(item.value))
        //   }
        //   accessedMenus = accessedMenus.filter(routeFilter)
        //   break
        case PermissionModeEnum.ROUTE_MAPPING: {
          this.setDynamicAddedRoute(false)
          accessedMenus = BusinessRoutes
          break
        }
        default: {
          accessedMenus = BusinessRoutes
        }
      }
      const m = toRaw(router2menuDeep(accessedMenus))
      this.setMenus(m)
      this.setWhitelist(m)
      return accessedMenus
    },
  },
})

// Need to be used outside the setup
export function useRouteStoreWidthOut() {
  return useRouteStore(store)
}
