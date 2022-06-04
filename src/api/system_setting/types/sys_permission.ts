import { Page } from '@/api/system_setting/types/sys_role'

export type PerId = {
  id?: number
}

export type BasePer = PerId & {
  name: string
  code: string
  sort: number
  menuId: number
}

export type SearchPer = Page & {
  name: string
  menuId?: number
  sysRoleId?: number
}

export type PerPer = PerId & {
  sysRoleId?: Array<number>
}

export type registerPer = Omit<BasePer, 'id'>
