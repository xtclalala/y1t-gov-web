import type { AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'
import { PAGE } from '@r/constant'
import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'

// import { t } from '@/utils/i18n/useI18n'

export const SYSTEM_ROUTE: AppRouteRecordRaw = {
  path: rPath.SYSTEM,
  name: rName.SYSTEM,
  redirect: PageEnum.SYSTEM_USER,
  component: PAGE,
  meta: {
    title: '系统设置',
    icon: 'github',
  },
  children: [
    {
      path: rPath.SYSTEM_MENU,
      name: rName.SYSTEM_MENU,
      component: () => import('@/pages/system_setting/sys_menu/index.vue'),
      meta: {
        // title: t('routes.system.sysMenu'),
        title: '菜单设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: rPath.SYSTEM_ORGAMIZE,
      name: rName.SYSTEM_ORGAMIZE,
      component: () => import('@/pages/system_setting/sys_organization/index.vue'),
      meta: {
        // title: t('routes.system.sysOrganization'),
        title: '部门设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: rPath.SYSTEM_PERMISSION,
      name: rName.SYSTEM_PERMISSION,
      component: () => import('@/pages/system_setting/sys_permission/index.vue'),
      meta: {
        // title: t('routes.system.sysPermission'),
        title: '页面权限设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: rPath.SYSTEM_ROLE,
      name: rName.SYSTEM_ROLE,
      component: () => import('@/pages/system_setting/sys_role/index.vue'),
      meta: {
        // title: t('routes.system.sysRole'),
        title: '角色设置',
        hideBreadcrumb: true,
      },
    },
    {
      path: rPath.SYSTEM_USER,
      name: rName.SYSTEM_USER,
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
  path: rPath.TEST,
  name: rName.TEST,
  component: () => import('@/pages/test/Test.vue'),
  meta: {
    // title: t('routes.system.sysMenu'),
    title: '测试',
    hideBreadcrumb: true,
  },
}

export const ABOUT_ROUTER: AppRouteRecordRaw = {
  path: rPath.ABOUT,
  name: rName.ABOUT,
  component: () => import('@/pages/about/index.vue'),
  meta: {
    // title: t('routes.dashboard.about'),
    title: '关于',
    icon: 'close',
    hideMenu: true,
  },
}

export const LOGIN_ROUTE: AppRouteRecordRaw = {
  path: rPath.LOGIN,
  name: rName.LOGIN,
  component: () => import('@/pages/common/login.vue'),
  meta: {
    title: '登录',
    hideBreadcrumb: true,
  },
}
