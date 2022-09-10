import { Page } from '@/api/type'

type SearchMenu = Pick<BaseMenu, 'name' | 'path' | 'title' | 'component'>

type SearchMenuWithPage = Page & SearchMenu

type MenuId = {
  id: number
}

type BaseMenu = MenuId & {
  name: string
  title: string
  path: string
  hidden: boolean
  component: string
  icon: string
  sort: number
  pid?: number
  permissions?: any[]
  disabled?: boolean
}

type PerMenu = MenuId & {
  sysRoleId: Array<number>
}

type registerMenu = Omit<BaseMenu, 'id'> &
  Partial<PerMenu> & {
    hiddenNumber: string
  }

type SelectMenu = Pick<BaseMenu, 'id' | 'name'>

export type { SearchMenu, SearchMenuWithPage, BaseMenu, PerMenu, registerMenu, SelectMenu, MenuId }
