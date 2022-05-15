export type Page = {
  PageSize: number
  Page: number
  Desc: boolean
}

export type SearchRoles = Page & {
  name?: string
  pid?: number
}

export type RoleId = {
  id?: number
}

export type BaseRole = RoleId & {
  name: string
  orgId: number
  sort: number
  pid?: number
}

export type PerRole = RoleId & {
  menuIds?: Array<number>
  permissions?: Array<number>
}

export type registerRole = BaseRole & PerRole
