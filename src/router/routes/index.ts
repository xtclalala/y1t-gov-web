import type { AppRouteRecordRaw } from '@/router/types'

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic'
import { SYSTEM_ROUTE, TEST, ABOUT_ROUTER, LOGIN_ROUTE } from '@r/routes/modules/config'
import { PageEnum } from '@/enums/pageEnum'
import { LAYOUT } from '@r/constant'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'

export const RootRoute: AppRouteRecordRaw = {
  path: rPath.ROOT,
  name: rName.ROOT,
  redirect: PageEnum.BASE_LOGIN,
  meta: {
    title: '根',
  },
}

export const Routes: AppRouteRecordRaw[] = [TEST, ABOUT_ROUTER, SYSTEM_ROUTE]

export const BaseRoutes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, LOGIN_ROUTE]

export const ViewRoute: AppRouteRecordRaw = {
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
