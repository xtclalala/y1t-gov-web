import { BaseMenu } from '@/api/system_setting/types/sys_menu'
import { BasePer } from '@/api/system_setting/types/sys_permission'

export type Page = {
  pageSize: number
  page: number
  desc: boolean
}

export type SearchRole = Page & Pick<BaseRole, 'name' | 'pid'>

export type RoleId = {
  id: number
}

export type BaseRole = Partial<RoleId> & {
  name: string
  code: string
  orgId: number
  sort: number
  pid?: number
}

export type RoleMenu = Partial<RoleId> & {
  menus: Array<BaseMenu>
  menuIds?: Array<number>
}

export type RolePer = Partial<RoleId> & {
  permissions: Array<BasePer>
  permissionIds?: Array<number>
}

export type registerRole = Omit<BaseRole & RolePer & RoleMenu, 'id'>
