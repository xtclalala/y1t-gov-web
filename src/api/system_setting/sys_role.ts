import { defHttp } from '@/service'
import { PageResult, RequestOptions, Result } from '#axios'
import {
  registerRole,
  BaseRole,
  PerRole,
  RoleId,
  SearchRoles,
} from '@/api/system_setting/types/sys_role'

enum Api {
  register = '/role/register',
  updateBaseInfo = '/role/roleBaseInfo',
  updateRole = '/role/menus',
  updatePer = '/role/per',
  copyRole = '/role/copyRole',
  getCompleteInfo = '/role/roleCompleteInfo',
  role = '/role/role',
  getRolesByOrg = '/role/roleByOrg',
}

export const register = <T = Result>(params: registerRole, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.register, params }, options)

export const updateBaseInfo = <T = Result>(params: BaseRole, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.updateBaseInfo, params }, options)

export const updateRole = <T = Result>(params: PerRole, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.updateRole, params }, options)

export const updatePer = <T = Result>(params: PerRole, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.updatePer, params }, options)

export const copyRole = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.copyRole, params }, options)

export const getCompleteInfo = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.getCompleteInfo, params }, options)

export const deleteRole = <T = Result>(params: RoleId, options?: RequestOptions) =>
  defHttp.delete<T>({ url: Api.role, params }, options)

export const search = <T = PageResult>(params: SearchRoles, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.role, params }, options)

export const getRolesByOrg = <T = Result>(params: OrgId, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.getRolesByOrg, params }, options)
