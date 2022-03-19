export enum rPath {
  TEST = '/myTest',

  ROOT = '/',
  TAB_VIEW = '/tabview',
  LOGIN = '/login',

  NOT_FOUND = '/:path(.*)*',
  REDIRECT = '/redirect',
  REDIRECT_ROUTE = '/redirect/:path(.*)',

  SYSTEM = '/system',
  SYSTEM_MENU = '/system/menu',
  SYSTEM_ROLE = '/system/role',
  SYSTEM_USER = '/system/user',
  SYSTEM_ORGAMIZE = '/system/organize',
  SYSTEM_PERMISSION = '/system/permission',
  ABOUT = '/aboutProject',
}
