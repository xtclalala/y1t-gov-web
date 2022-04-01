import { IRole } from '@/api/common/model/login'

export interface IRoleSelect {
  name: string
  id: string
  label: string
  value: string
}

export const roles2Select = (roles: IRole[]): IRoleSelect[] => {
  return roles.map((self) => {
    return {
      name: self.name,
      id: self.id,
      label: self.name,
      value: self.id,
    }
  })
}
