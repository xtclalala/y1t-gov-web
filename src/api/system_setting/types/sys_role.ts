export type Page = {
  pageSize: number
  page: number
  desc: boolean
}

export type SearchRole = Page & {
  name: string | undefined
  pid: number | undefined
}

export type RoleId = {
  id?: number
}

export type BaseRole = RoleId & {
  name: string
  code: string
  orgId: number
  sort: number
  pid?: number
}

export type RoleMenu = RoleId & {
  menuIds: Array<number>
}

export type RolePer = RoleId & {
  permissions: Array<number>
}

export type registerRole = Omit<BaseRole & RolePer & RoleMenu, 'id'>
