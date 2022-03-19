// import { MenuOption } from 'naive-ui'
import { AppRouteRecordRaw } from '@r/types'

import { h } from 'vue'
import Icon from '@/components/yIcon/index.vue'
// import { RouterLink } from 'vue-router'

const renderIcon = (icon: string | undefined) => {
  return () => {
    return h(Icon, { type: icon })
  }
}

// const hRouterLink = (name: string, title: string) => () =>
//   h(RouterLink, { to: { name: name } }, { default: () => title })

export const router2menu = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const menu: AppRouteRecordRaw[] = []
  for (const item of routes) {
    const { meta, name, children } = item
    const menuItem: AppRouteRecordRaw = {
      ...item,
      // label: hRouterLink(name, meta.title),
      label: meta.title,
      key: name,
      // todo
      // disabled: meta.hideMenu,
      disabled: false,
      // icon: renderIcon(meta.icon),
      icon: renderIcon('github'),
      children: children !== undefined ? router2menu(children) : undefined,
    }
    menu.push(menuItem)
  }
  return menu
}
