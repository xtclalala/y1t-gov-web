import { AppRouteRecordRaw, Menu } from '@r/types'
import { renderIcon } from '@/utils/yIcon'

export const router2menuDeep = (routes: AppRouteRecordRaw[] | Menu[]): Menu[] => {
  const menu: Menu[] = []
  for (const item of routes) {
    const { meta = {}, name, children } = item
    if (meta.hideMenu) {
      continue
    }
    const menuItem: Menu = {
      ...item,
      label: !meta.title ? '默认标题' : meta.title,
      key: name,
      disabled: meta.disabled === true,
      icon: renderIcon(!meta.icon ? 'LogoGithub' : meta.icon),
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

export const addMeta = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  const m: AppRouteRecordRaw[] = []
  for (const route of routes) {
    const temp: AppRouteRecordRaw = {
      ...route,
      meta: {
        hideMenu: route.hidden,
        title: route.title || '11',
      },
      children: route.children !== null ? addMeta(route.children) : undefined,
    }
    m.push(temp)
  }
  return m
}
