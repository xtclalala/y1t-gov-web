import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { BusinessRoutes, basicRoutes, ViewRoute } from '@r/index'

// import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { PermissionModeEnum } from '@/enums/appEnum'
import { IRoleSelect } from '@/utils/yRoles'
import { addMeta, router2menuDeep } from '@/utils/yMenu'
import { AppRouteRecordRaw, Menu } from '@r/types'
import { asyncRouterHandle, payloadRoute } from '@/utils/yRouter/router'
import projectSetting from '@/settings/projectSetting'

export interface IAsyncRouteState {
  menus: Menu[]
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw
  keepAliveComponents: string[]
  isDynamicAddedRoute: boolean
}

export const useRouteStore = defineStore({
  id: 'route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: basicRoutes,
    addRouters: ViewRoute,
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: true,
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters)
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    // 设置动态路由
    setRouters(routers: AppRouteRecordRaw[]) {
      this.addRouters.children?.push(...routers)
      this.routers = basicRoutes.concat(this.addRouters)
    },
    setMenus(menus: AppRouteRecordRaw[]) {
      // 设置动态路由
      this.menus = router2menuDeep(menus)
    },
    setKeepAliveComponents(compNames) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames
    },
    async generateRoutes(data: IRoleSelect) {
      let accessedRouters: AppRouteRecordRaw[] = []

      const { permissionMode } = projectSetting
      switch (permissionMode) {
        case PermissionModeEnum.BACK: {
          let menus = data.menus || []
          menus = payloadRoute(toRaw(menus))
          asyncRouterHandle(menus)
          accessedRouters = toRaw(addMeta(menus))
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
        //   accessedRouters = accessedRouters.filter(routeFilter)
        //   break
        case PermissionModeEnum.ROUTE_MAPPING: {
          accessedRouters = BusinessRoutes
          break
        }
        default: {
          accessedRouters = BusinessRoutes
        }
      }
      this.setRouters(accessedRouters)
      this.setMenus(accessedRouters)
      return accessedRouters
    },
  },
})

// Need to be used outside the setup
export function useRouteStoreWidthOut() {
  return useRouteStore(store)
}
