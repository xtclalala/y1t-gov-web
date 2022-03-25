export enum rPath {
  TEST = '/myTest',

  ROOT = '/',
  TAB_VIEW = '/tabview',
  LOGIN = '/login',

  NOT_FOUND = '/:path(.*)*',
  REDIRECT = '/redirect',
  REDIRECT_ROUTE = '/redirect/:path(.*)',

  SYSTEM = '/system',
  SYSTEM_MENU = 'menu',
  SYSTEM_ROLE = 'role',
  SYSTEM_USER = 'user',
  SYSTEM_ORGANIZE = 'organize',
  SYSTEM_PERMISSION = 'permission',
  ABOUT = 'about',
}
