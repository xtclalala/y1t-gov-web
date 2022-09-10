import { RoleEnum } from '@/enums/roleEnum'
import { defineComponent, VNode } from 'vue'

type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<T>)

interface Menu {
  id: number

  pid: number

  // menu route name
  name: string

  // menu route path
  path: string

  // menu route title
  title: string

  icon: string | (() => VNode)

  permissions?: [] | null

  sort: number

  children: Menu[] | null

  // component path
  component?: string

  roles?: RoleEnum[]

  // hidden menu
  hidden: boolean

  keepAlive: boolean
}

export type { Menu, Component }
