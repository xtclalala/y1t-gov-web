import { AppRouteRecordRaw, Menu } from '@r/types'
import { renderIcon } from '@/utils/yIcon'

export const router2menuDeep = (routes: AppRouteRecordRaw[]): Menu[] => {
  const menu: Menu[] = []
  for (const item of routes) {
    const { meta, name, children, path } = item
    if (meta.hideMenu) {
      continue
    }
    const menuItem: Menu = {
      id: meta.id,
      pid: meta.pid ? meta.pid : 0,
      name: name,
      path: path,
      title: meta.title,
      hidden: meta.hideMenu ? meta.hideMenu : false,
      sort: 1,
      keepAlive: true,
      icon: renderIcon(!meta.icon ? 'LogoGithub' : meta.icon),
      children: children !== undefined ? router2menuDeep(children) : null,
    }
    menu.push(menuItem)
  }
  return menu
}

export const router2menu = (routes: AppRouteRecordRaw): Menu => {
  const { name, meta } = routes
  return { name, title: meta.title } as Menu
}

export const addMeta = (routes: Menu[]): AppRouteRecordRaw[] => {
  const m: AppRouteRecordRaw[] = []
  for (const route of routes) {
    const temp: AppRouteRecordRaw = {
      ...route,
      meta: {
        hideMenu: route.hidden,
        title: route.title,
      },
      children: route.children !== null ? addMeta(route.children) : undefined,
    }
    m.push(temp)
  }
  return m
}

export const renderMenuIcon = (menu: Menu[]): Menu[] => {
  menu.flatMap((item) => {
    if (typeof item.icon === 'string') {
      item.icon = renderIcon(item.icon)
    }
    if (item.children !== null) {
      item.children = renderMenuIcon(item.children)
    }
    return item
  })
  return menu
}
