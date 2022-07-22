import type { AppRouteRecordRaw } from '@r/types'
import type { RouteLocationNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { App } from 'vue'
import { LOGIN_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@r/basic'
import { PageEnum } from '@/enums/pageEnum'
import { LAYOUT } from '@r/constant'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
import { useRouteStoreWidthOut } from '@/store/module/router'

// 获取 modules 下的路由
const modules = import.meta.globEager('./modules/*.ts')
const routeModuleList: AppRouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
// 登录以后需要权限的路由
export const AfterBusinessRoutes: AppRouteRecordRaw[] = [...routeModuleList]

// 获取 modules 下的路由
const common = import.meta.globEager('./common/*.ts')
const routeWhiteList: AppRouteRecordRaw[] = []
Object.keys(common).forEach((key) => {
  const mod = common[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeWhiteList.push(...modList)
})
// 登录以后的公共路由
export const AfterPublicRoutes: AppRouteRecordRaw[] = [...routeWhiteList]

export const RootRoute: AppRouteRecordRaw = {
  path: rPath.ROOT,
  name: rName.ROOT,
  redirect: PageEnum.BASE_LOGIN,
  meta: {
    title: '根',
    white: true,
  },
}

// 基本路由
export const BaseRoutes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, LOGIN_ROUTE]

export const ViewRoute: AppRouteRecordRaw = {
  path: rPath.TAB_VIEW,
  name: rName.TAB_VIEW,
  component: LAYOUT,
  redirect: PageEnum.SYSTEM_USER,
  meta: {
    title: 'tab',
  },
  // children: [...routeModuleList, ...routeWhiteList],
  children: [...routeWhiteList],
}

// Basic routing without permission
export const basicRoutes = [RootRoute, ...BaseRoutes, ViewRoute]

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    if (item.meta.white) {
      WHITE_NAME_LIST.push(item.name)
    }
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}

// @ts-ignore
router.beforeEach(async (to, form, next) => {
  const addRoutes = async (
    to: RouteLocationNormalized,
    pName: string,
    routeList: AppRouteRecordRaw[]
  ): Promise<void> => {
    console.log(router.hasRoute(to.name as RouteRecordName))
    console.log(to)
    console.log(router.getRoutes())
    if (router.hasRoute(to.name as RouteRecordName)) {
      return
    }
    routeList.forEach((item) => {
      router.addRoute(pName, item as RouteRecordRaw)
      if (item.children) {
        addRoutes(to, item.name, item.children)
      }
    })
    next({ ...to, replace: true })
    // const f = routeStoreWidthOut.getWhitelist?.includes(to.name as string)
    // const res = f === undefined ? false : f
    // return WHITE_NAME_LIST.includes(to.name as string) || res
  }
  window.$loadingBar?.start()

  // 判断是否登录
  if (true) {
    const routeStoreWidthOut = useRouteStoreWidthOut()
    const routeList = await routeStoreWidthOut.generateRoute()
    await addRoutes(to, rName.TAB_VIEW, routeList)
    next()
  } else {
    next({ name: rName.LOGIN })
  }
})

router.afterEach(() => {
  window.$loadingBar?.finish()
})
