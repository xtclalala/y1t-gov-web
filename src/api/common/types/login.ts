import { AppRouteRecordRaw } from '@r/types'

export interface LoginParams {
  username: string
  password: string
}

export interface Information {
  username: string
  roles: IRole[]
  orgs: IOrg[]
}

export interface IRole {
  ID: number
  name: string
  pid?: number
  sort?: number
  organizeId?: number
  menus: AppRouteRecordRaw[]
}

export interface IOrg {
  ID: number
  name: string
  pid?: number
  sort?: number
  children?: IOrg[]
}

export interface IMenu {
  ID: number
  name: string
  path: string
  component: string
  hidden: boolean
  icon?: string
  pid?: number
  sort?: number
  children?: IMenu[]
}