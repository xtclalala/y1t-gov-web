import { Page } from '@/api/system_setting/types/sys_role'

export type PerId = {
  id: number
}

export type BasePer = Partial<PerId> & {
  title: string
  code: string
  sort: number
  menuId: number
}

export type SearchPer = Page &
  Partial<Pick<BasePer, 'title' | 'menuId'> & Pick<PerPer, 'sysRoleId'>>

export type PerPer = Partial<PerId> & {
  sysRoleId: Array<number>
}

export type registerPer = Omit<BasePer, 'id'>
