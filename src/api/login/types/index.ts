/**
 * 登录接口参数
 */
import { Menu } from '@r/types'

interface LoginParams {
  loginName: string
  password: string
}

/**
 * 获取登录用户接口的返回
 */
interface Information {
  id: string
  username: string
  roles: IRole[]
  orgs: IOrg[]
}

interface IRole {
  id: number
  name: string
  pid?: number
  sort?: number
  organizeId?: number
  menus: Menu[]
}

interface IOrg {
  ID: number
  name: string
  pid?: number
  sort?: number
  children?: IOrg[]
}

export type { LoginParams, Information, IRole, IOrg }
