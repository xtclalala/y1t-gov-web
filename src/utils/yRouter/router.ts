import { AppRouteRecordRaw } from '@r/types'

export const payloadRoute = (routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] => {
  sortRoute(routes)
  // return routes.filter((father) => {
  //   const t = routes.filter((child) => {
  //     return father.ID === child.pid
  //   })
  //   t.length > 0 ? (father.children = t) : ''
  //   return father.pid === 0
  // })
  console.log(list2Tree(routes))
  return list2Tree(routes)
}

export const sortRoute = (routes: AppRouteRecordRaw[]) => {
  routes.sort((a, b) => {
    return (a.pid || 0) - (b.pid || 0)
  })
  routes.sort((a, b) => {
    return (a.sort || 100) - (b.sort || 100)
  })
}

export const tree2list = <T>(tree: T[]): T[] => {
  const l: T[] = []
  const s = [...tree]
  while (s.length) {
    const node: T = s.pop()
    const children = node?.children
    if (children) {
      s.push(...children)
    }
    l.push(node)
  }

  return l
}

export const list2Tree = <T>(list: T[]): T[] => {
  const cloneList = JSON.parse(JSON.stringify(list))
  return cloneList.filter((father) => {
    const bArray = cloneList.filter((child) => father.id === child.pid)
    bArray.length > 0 ? (father.children = bArray) : ''
    return father.pid === 0
  })
}
