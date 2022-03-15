import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

import { PAGE_NOT_FOUND_ROUTE, ABOUT_ROUTER } from '@/router/routes/basic'
import { SYSTEM_ROUTE } from '@/router/routes/system_setting'
import { PageEnum } from '@/enums/pageEnum'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

// export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
export const asyncRoutes = [...routeModuleList]

export const Routes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, ABOUT_ROUTER, SYSTEM_ROUTE]

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.SYSTEM_USER,
  meta: {
    title: '根',
  },
}

// Basic routing without permission
export const basicRoutes = [
  // LoginRoute,
  RootRoute,
  // ...mainOutRoutes,
  ...Routes,
]
