export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const EXCEPTION_COMPONENT = () => import('@/pages/exception/404.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('@/layouts/index.vue')
export const PAGE = () => import('@/layouts/components/page/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      })
    })
}
