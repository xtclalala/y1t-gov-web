import { AppRouteRecordRaw, Menu } from '@r/types'
import { list2Tree } from '@/utils/helper/treeHelper'
import { PAGE } from '@r/constant'

export const buildMenusTree = (routes: Menu[]): Menu[] => {
  sortRoute(routes)
  return list2Tree(routes)
}

export const sortRoute = (routes: Menu[]) => {
  routes.sort((a, b) => {
    return (a.pid || 0) - (b.pid || 0)
  })
  routes.sort((a, b) => {
    return (a.sort || 100) - (b.sort || 100)
  })
}

const modules = import.meta.glob('../../pages/**/*.vue')

export const buildDynamicRoute = async (routeList: AppRouteRecordRaw[]): Promise<void> => {
  routeList.forEach((item) => {
    if (typeof item.component === 'string') {
      if (item.component === 'PAGE') {
        item.component = PAGE
      } else {
        console.log(modules[`../../${item.component}`])
        item.component = modules[`../../${item.component}`]
      }
    }
    if (item.children !== undefined) {
      buildDynamicRoute(item.children)
    }
  })
}
