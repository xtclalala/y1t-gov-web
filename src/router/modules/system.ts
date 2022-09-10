import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
import { PageEnum } from '@/enums/pageEnum'
import { PAGE } from '@r/constant'
import type { AppRouteRecordRaw } from 'vue-router'

const routes: AppRouteRecordRaw = {
  path: rPath.SYSTEM,
  name: rName.SYSTEM,
  redirect: PageEnum.SYSTEM_USER,
  component: PAGE,
  meta: {
    title: '系统设置',
    icon: 'AtCircleOutline',
  },
  children: [
    {
      path: rPath.SYSTEM_MENU,
      name: rName.SYSTEM_MENU,
      component: () => import('@/pages/system/sys_menu/index.vue'),
      meta: {
        // title: t('routes.system.sysMenu'),
        title: '菜单设置',
        hideBreadcrumb: true,
      },
    },
  ],
}

export default routes
