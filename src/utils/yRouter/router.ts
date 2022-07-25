import { AppRouteRecordRaw, Menu } from '@r/types'
import { list2Tree } from '@/utils/helper/treeHelper'
import { PAGE } from '@r/constant'
import { listSort } from '@/utils/helper/listHelper'

/**
 * 构建侧边菜单兰内容
 * @param routes 用户可以使用的菜单
 */
export const buildMenusTree = (routes: Menu[]): Menu[] => {
  sortRoute(routes)
  return list2Tree(routes)
}

/**
 * 路由排序
 * @param routes 需要排序的路由
 */
export const sortRoute = (routes: Menu[]) => {
  listSort(routes, 'pid', 0)
  listSort(routes, 'sort', 100)
}
/**
 * 引入 pages 下的 sfc
 */
const modules = import.meta.glob('../../pages/**/*.vue')

/**
 * 动态导入 sfc
 * @param routeList
 */
export const buildDynamicRoute = async (routeList: AppRouteRecordRaw[]): Promise<void> => {
  routeList.forEach((item) => {
    if (typeof item.component === 'string') {
      if (item.component === 'PAGE') {
        item.component = PAGE
      } else {
        item.component = modules[`../../${item.component}`]
      }
    }
    if (item.children !== undefined) {
      buildDynamicRoute(item.children)
    }
  })
}
