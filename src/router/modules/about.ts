import { rPath } from '@/enums/rPath'
import { rName } from '@/enums/rName'
import type { AppRouteRecordRaw } from 'vue-router'

const routes: AppRouteRecordRaw = {
  path: rPath.ABOUT,
  name: rName.ABOUT,
  component: () => import('@/pages/about/index.vue'),
  meta: {
    // title: t('routes.dashboard.about'),
    title: '关于',
    icon: 'LogoGithub',
    hideMenu: false,
  },
}

export default routes
