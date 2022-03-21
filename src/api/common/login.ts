import { defHttp } from '@/service'
import { LoginParams } from '@/api/common/model/login'
import { RequestOptions, Result } from '#axios'

enum Api {
  Login = '/721636/login',
}

export const doLogin = <T = Result>(params: LoginParams, options?: RequestOptions) =>
  defHttp.post<T>({ url: Api.Login, params }, options)
