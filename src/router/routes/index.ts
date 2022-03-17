import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

import { PAGE_NOT_FOUND_ROUTE, ABOUT_ROUTER, REDIRECT_ROUTE } from '@/router/routes/basic'
import { SYSTEM_ROUTE, TEST } from '@r/routes/config'
import { PageEnum } from '@/enums/pageEnum'
import { LAYOUT } from '@r/constant'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
export const asyncRoutes = [...routeModuleList]

export const Routes: AppRouteRecordRaw[] = [SYSTEM_ROUTE, TEST]

const BaseRoutes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, ABOUT_ROUTER, REDIRECT_ROUTE]

const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.SYSTEM_USER,
  meta: {
    title: '根',
  },
}

const Route: AppRouteRecordRaw = {
  path: '/S',
  name: 'S',
  component: LAYOUT,
  meta: {
    title: 'S',
  },
  children: [...Routes],
}

// Basic routing without permission
export const basicRoutes = [
  // LoginRoute,
  RootRoute,
  Route,
  // ...mainOutRoutes,
  ...BaseRoutes,
]
