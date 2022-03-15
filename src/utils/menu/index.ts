import { MenuOption } from 'naive-ui'
import { AppRouteRecordRaw } from '@r/types'

import { h } from 'vue'
import Icon from '@/components/icon.vue'
// import { RouterLink } from 'vue-router'

const renderIcon = (icon: string | undefined) => {
  return () => {
    return h(Icon, { type: icon })
  }
}

// const hRouterLink = (name: string, title: string) => () =>
//   h(RouterLink, { to: { name: name } }, { default: () => title })

export const router2menu = (routes: AppRouteRecordRaw[]): MenuOption[] => {
  const menu: MenuOption[] = []
  for (const { meta, name, children } of routes) {
    const menuItem: MenuOption = {
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
