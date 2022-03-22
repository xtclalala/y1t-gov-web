import { defHttp } from '@/service'
import { LoginParams } from '@/api/common/model/login'
import { RequestOptions, Result } from '#axios'

enum Api {
  Login = '/721636/login',
  Informational = '/721636/informational',
}

export const doLogin = <T = Result>(params: LoginParams, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.Login, params }, options)

export const getInformation = <T = Result>(options?: RequestOptions) =>
  defHttp.get<T>({ url: Api.Informational }, options)
