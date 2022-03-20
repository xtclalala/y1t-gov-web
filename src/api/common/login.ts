import { defHttp } from '@/service'
import { LoginParams } from '@/api/common/model/login'

enum Api {
  Login = '/721636/login',
}

interface t {
  status: number
  message: string
  result: any
}

export const doLogin = (params: LoginParams) => defHttp.post<t>({ url: Api.Login, params })
