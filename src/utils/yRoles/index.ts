import { IRole } from '@/api/common/types/login'
import { Menu } from '@r/types'

export interface IRoleSelect {
  name: string
  id: number
  label: string
  value: number
  pid?: number
  sort?: number
  organizeId?: number
  menus: Menu[]
}

export const roles2Select = (roles: IRole[]): IRoleSelect[] => {
  return roles.map((self) => {
    return {
      ...self,
      name: self.name,
      id: self.ID,
      label: self.name,
      value: self.ID,
    }
  })
}
