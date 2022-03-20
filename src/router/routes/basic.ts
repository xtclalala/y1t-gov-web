import type { AppRouteRecordRaw } from '@/router/types'

import { EXCEPTION_COMPONENT, LAYOUT, REDIRECT_COMPONENT } from '@/router/constant'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
// import { t } from '@/utils/i18n/useI18n'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: rPath.NOT_FOUND,
  name: rName.NOT_FOUND,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: rPath.NOT_FOUND,
      name: rName.NOT_FOUND,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: rPath.REDIRECT,
  name: rName.REDIRECT,
  component: LAYOUT,
  meta: {
    title: 'redirect',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: rPath.REDIRECT_ROUTE,
      name: rName.REDIRECT_ROUTE,
      component: REDIRECT_COMPONENT,
      meta: {
        title: 'redirect',
        hideBreadcrumb: true,
      },
    },
  ],
}
