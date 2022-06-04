import { defHttp } from '@/service'
import { PageResult, RequestOptions, Result } from '#axios'
import {
  registerRole,
  BaseRole,
  RoleId,
  SearchRole,
  RoleMenu,
  RolePer,
} from '@/api/system_setting/types/sys_role'
import { OrgId } from '@/api/system_setting/types/sys_organization'

enum Api {
  addMenu = '/role/menus',
  addPer = '/role/per',
  copyRole = '/role/copyRole',
  getCompleteInfo = '/role/roleCompleteInfo',
  role = '/role/role',
  getRolesByOrg = '/role/roleByOrg',
}

export const register = <T = Result>(params: registerRole, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.role, params }, options)

export const updateRole = <T = Result>(params: BaseRole, options?: RequestOptions) =>
  defHttp.put<T>({ url: Api.role, params }, options)

export const roleAddMenu = <T = Result>(params: RoleMenu, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.addMenu, params }, options)

export const roleAddPer = <T = Result>(params: RolePer, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.addPer, params }, options)

export const copyRole = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.copyRole, params }, options)

export const getCompleteInfo = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.getCompleteInfo, params }, options)

export const deleteRole = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.delete<T>({ url: Api.role, params }, options)

export const searchRole = <T = PageResult>(params: SearchRole, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.role, params }, options)

export const rolesByOrg = <T = Result>(params: OrgId, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.getRolesByOrg, params }, options)
