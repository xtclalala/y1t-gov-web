export type Page = {
  pageSize: number
  page: number
  desc: boolean
}

export type SearchRoles = {
  name: string | undefined
  pid: number | undefined
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
