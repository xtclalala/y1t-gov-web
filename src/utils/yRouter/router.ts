import { Menu } from '@r/types'
import { list2Tree } from '@/utils/helper/treeHelper'

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
