import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { RoleEnum } from '@/enums/roleEnum'
import { defineComponent } from 'vue'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  hidden?: boolean
  name: string
  title?: string
  meta: RouteMeta
  component?: Component | string
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  label?: string
  key?: string
  disabled?: boolean
  icon?: any
  pid?: number
  ID?: number
  sort?: number
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  label: string

  key: string

  name: string

  icon?: any

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[] | undefined

  orderNo?: number

  roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw
