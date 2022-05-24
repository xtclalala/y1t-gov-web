import { defHttp } from '@/service'
import { RequestOptions, Result } from '#axios'
import { BasePer, PerId, registerPer, SearchPer } from '@/api/system_setting/types/sys_permission'

enum Api {
  per = '/permission/per',
  allPer = '/permission/perAll',
}

export const register = <T = Result>(params: registerPer, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.per, params }, options)

export const updatePer = <T = Result>(params: BasePer, options?: RequestOptions) =>
  defHttp.put<T>({ url: Api.per, params }, options)

export const allPerById = <T = Result>(params: PerId, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.allPer, params }, options)

export const deletePer = <T = Result>(params: PerId, options?: RequestOptions) =>
  defHttp.delete<T>({ url: Api.per, params }, options)

export const searchPer = <T = Result>(params: SearchPer, options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.per, params }, options)
