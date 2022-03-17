import type { AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
import { PAGE } from '@r/constant'

// import { t } from '@/utils/i18n/useI18n'

export const SYSTEM_ROUTE: AppRouteRecordRaw = {
  path: '/system',
  name: 'systemSetting',
  redirect: PageEnum.SYSTEM_USER,
  component: PAGE,
  meta: {
    title: '系统设置',
    icon: 'github',
  },
  children: [
    {
      path: '/system/menu',
      name: 'menu',
      component: () => import('@/pages/system_setting/sys_menu/index.vue'),
      meta: {
        // title: t('routes.system.sysMenu'),
        title: '菜单设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: '/system/organization',
      name: 'organization',
      component: () => import('@/pages/system_setting/sys_organization/index.vue'),
      meta: {
        // title: t('routes.system.sysOrganization'),
        title: '部门设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: '/system/permission',
      name: 'permission',
      component: () => import('@/pages/system_setting/sys_permission/index.vue'),
      meta: {
        // title: t('routes.system.sysPermission'),
        title: '页面权限设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: '/system/role',
      name: 'role',
      component: () => import('@/pages/system_setting/sys_role/index.vue'),
      meta: {
        // title: t('routes.system.sysRole'),
        title: '角色设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: '/system/user',
      name: 'user',
      component: () => import('@/pages/system_setting/sys_user/index.vue'),
      meta: {
        // title: t('routes.system.sysUser'),
        title: '用户设置',
        hideBreadcrumb: true,
      },
    },
  ],
}

export const TEST: AppRouteRecordRaw = {
  path: '/test',
  name: 'text',
  component: () => import('@/pages/test/Test.vue'),
  meta: {
    // title: t('routes.system.sysMenu'),
    title: '测试',
    hideBreadcrumb: true,
  },
}

export const ABOUT_ROUTER: AppRouteRecordRaw = {
  path: '/about',
  name: 'AboutPage',
  component: () => import('@/pages/about/index.vue'),
  meta: {
    // title: t('routes.dashboard.about'),
    title: '关于',
    icon: 'simple-icons:about-dot-me',
    hideMenu: true,
  },
}
