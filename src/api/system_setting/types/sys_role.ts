export interface Page {
  PageSize: number
  Page: number
  Desc: boolean
}

export interface SearchRoles extends Page {
  name?: string
  pid?: number
}

export interface RoleId {
  id?: number
}

export interface BaseRole extends RoleId {
  name: string
  orgId: number
  sort: number
  pid?: number
}

export interface PerRole extends RoleId {
  menuIds?: Array<number>
  permissions?: Array<number>
}

export interface registerRole extends BaseRole, PerRole {}
