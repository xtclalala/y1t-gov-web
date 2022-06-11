import { BaseRole, Page } from '@/api/system_setting/types/sys_role'
import { BaseOrg } from '@/api/system_setting/types/sys_organization'

export type SearchUser = Page & {
  username: string
  loginName: string
  roleId: number
  orgId: number
}

export type UserId = {
  id?: number
  CreateTime: string
  UpdateTime: string
}

export type BaseUser = UserId & {
  username: string
  loginName: string
}

export type PerUser = UserId & {
  roles?: Array<BaseRole>
  roleIds?: Array<number>
  organizes?: Array<BaseOrg>
  orgIds?: Array<number>
}

export type registerUser = BaseUser & PerUser
