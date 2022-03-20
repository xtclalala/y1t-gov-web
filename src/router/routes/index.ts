import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { SYSTEM_ROUTE, TEST, ABOUT_ROUTER, LOGIN_ROUTE } from '@r/routes/config'
import { PageEnum } from '@/enums/pageEnum'
import { LAYOUT } from '@r/constant'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'

const modules = import.meta.globEager('./routes/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
export const asyncRoutes = [...routeModuleList]

export const Routes: AppRouteRecordRaw[] = [TEST, ABOUT_ROUTER, SYSTEM_ROUTE]

const BaseRoutes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, LOGIN_ROUTE]

const RootRoute: AppRouteRecordRaw = {
  path: rPath.ROOT,
  name: rName.ROOT,
  redirect: PageEnum.SYSTEM_USER,
  meta: {
    title: '根',
  },
}

const ViewRoute: AppRouteRecordRaw = {
  path: rPath.TAB_VIEW,
  name: rName.TAB_VIEW,
  component: LAYOUT,
  meta: {
    title: 'tab',
  },
  children: [...Routes],
}

// Basic routing without permission
export const basicRoutes = [
  // LoginRoute,
  RootRoute,
  ViewRoute,
  // ...mainOutRoutes,
  ...BaseRoutes,
]
