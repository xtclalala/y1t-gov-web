export type SearchMenu = {
  name: string
  pid: number | undefined
  path: string
  title: string
  component: string
  pName: string
}

export type MenuId = {
  id?: number
}

export type BaseMenu = MenuId & {
  name: string
  title: string
  path: string
  hidden: boolean
  component: string
  icon: string
  sort: number
  pid?: number
}

export type PerMenu = MenuId & {
  sysRoleId?: Array<number>
}

export type registerMenu = BaseMenu &
  PerMenu & {
    hiddenNumber: string
  }
