import type { AppRouteRecordRaw } from '@/router/types'

import { EXCEPTION_COMPONENT, LAYOUT, PAGE_NOT_FOUND_NAME } from '@/router/constant'
// import { t } from '@/utils/i18n/useI18n'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

export const ABOUT_ROUTER: AppRouteRecordRaw = {
  path: '/about',
  name: 'AboutPage',
  component: LAYOUT,
  meta: {
    // title: t('routes.dashboard.about'),
    title: '关于',
    icon: 'simple-icons:about-dot-me',
    hideMenu: true,
  },
  children: [
    {
      path: '/about',
      name: 'AboutPage',
      component: () => import('@/pages/about/index.vue'),
      meta: {
        // title: t('routes.dashboard.about'),
        title: '关于',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
}
