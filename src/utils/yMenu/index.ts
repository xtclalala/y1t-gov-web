import { AppRouteRecordRaw } from '@r/types'
import { renderIcon } from '@/utils/yIcon'

export const router2menuDeep = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const menu: AppRouteRecordRaw[] = []
  for (const item of routes) {
    const { meta, name, children } = item
    if (meta.hideMenu === false) {
      break
    }
    const menuItem: AppRouteRecordRaw = {
      ...item,
      label: meta.title,
      key: name,
      disabled: meta.disabled === true,
      icon: renderIcon(!meta.icon ? 'github' : meta.icon),
      // icon: renderIcon('github'),
      children: children !== undefined ? router2menuDeep(children) : undefined,
    }
    menu.push(menuItem)
  }
  return menu
}

export const router2menu = (routes: AppRouteRecordRaw): AppRouteRecordRaw => {
  const { meta, name, key } = routes
  if (key !== undefined) {
    return routes
  }
  return { ...routes, label: meta.title, key: name }
}
