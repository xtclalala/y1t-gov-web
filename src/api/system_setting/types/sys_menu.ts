import { Page } from '@/api/system_setting/types/sys_role'

export type SearchMenu = Page & {
  name?: string
  pid?: number
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
