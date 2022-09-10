export enum rPath {
  ROOT = '/',
  TAB_VIEW = '/tabview',
  LOGIN = '/login',

  NOT_FOUND = '/:path(.*)*',
  NOT_FOUND_404 = '/404',
  REDIRECT = '/redirect',
  REDIRECT_ROUTE = '/redirect/:path(.*)',

  SYSTEM = '/system',
  SYSTEM_MENU = 'menu',
  ABOUT = '/about',
  CENTER = '/center',
}
