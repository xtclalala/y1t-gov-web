import { LAYOUT, PAGE } from '@r/constant'
import { AppRouteRecordRaw } from '@r/types'

const modules = import.meta.glob('../../pages/**/*.vue')

modules.PAGE = PAGE
modules.LAYOUT = LAYOUT

export const asyncRouterHandle = (asyncRouter) => {
  asyncRouter.forEach((item) => {
    if (item.component) {
      item.component = dynamicImport(modules, item.component)
    } else {
      delete item.component
    }
    if (item.children) {
      asyncRouterHandle(item.children)
    }
  })
}

function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  if (component === 'PAGE' || component === 'LAYOUT') {
    return dynamicViewsModules[component]
  }
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../', '')
    return k === component
  })
  const matchKey = matchKeys[0]

  return dynamicViewsModules[matchKey]
}

export const payloadRoute = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  sortRoute(routes)
  return routes.filter((father) => {
    const t = routes.filter((child) => {
      return father.ID === child.pid
    })
    t.length > 0 ? (father.children = t) : ''
    return father.pid === 0
  })
}

export const sortRoute = (routes: AppRouteRecordRaw[]) => {
  routes.sort((a, b) => {
    return (a.pid || 0) - (b.pid || 0)
  })
  routes.sort((a, b) => {
    return (a.sort || 100) - (b.sort || 100)
  })
}
