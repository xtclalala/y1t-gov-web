export type OrgId = {
  id?: number
}

export type SearchOrg = {
  name: string
  code: string
}

export type BaseOrg = OrgId & {
  name: string
  code: string
  sort: number
  pid: number
}

export type registerOrg = Omit<BaseOrg, 'id'>
