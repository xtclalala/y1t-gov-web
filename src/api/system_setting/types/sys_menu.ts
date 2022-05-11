import { Page } from '@/api/system_setting/types/sys_role'

export interface SearchMenu extends Page {
  name?: string
  pid?: number
}

export interface MenuId {
  id?: number
}

export interface BaseMenu extends MenuId {
  name: string
  title: string
  path: string
  hidden: boolean
  component: string
  icon: string
  sort: number
  pid?: number
}

export interface PerMenu extends MenuId {
  sysRoleId?: Array<number>
}

export interface registerMenu extends BaseMenu, PerMenu {}
