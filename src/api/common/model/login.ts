export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface Information {
  username: string
  roles: []
  organization: []
  permissions: []
}
