export type PerId = {
  id?: number
}

export type BasePer = PerId & {
  name: string
  code: string
  sort: number
  menuId: number
}

export type SearchPer = {
  name: string
  menuId?: number
  sysRoleId?: number
}

export type PerPer = PerId & {
  sysRoleId?: Array<number>
}

export type registerPer = Omit<BasePer, 'id'>
